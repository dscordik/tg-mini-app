from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from app.authtg import get_current_user  # строгая версия, не get_current_user_order
from app.database import get_db
from app.models import User, Order, OrderItem, Product
from app.schemas import OrderOut, OrderCreate

router = APIRouter(prefix='/api/order', tags=['order'])

@router.post('/', response_model=OrderOut)
def create_order(order: OrderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total_price = 0
    products_cache = []

    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Товар с id {item.product_id} не найден')
        total_price += product.price * item.total_count
        products_cache.append((product, item.total_count))

    new_order = Order(
        address=order.address,
        user_id=current_user.id,
        total_price=total_price,
        status='Оформляем'
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for product, count in products_cache:
        db.add(OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            product_name=product.title,
            price=product.price,
            total_count=count
        ))
    db.commit()
    db.refresh(new_order)

    return new_order


@router.get('/me', response_model=list[OrderOut])
def read_current_orders(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    orders = db.query(Order).filter(Order.user_id == current_user.id).all()
    return orders