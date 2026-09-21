from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status
from starlette.exceptions import HTTPException
from app.database import get_db
from app.models import Product
from app.schemas import ProductSchema

router = APIRouter(prefix='/api', tags=['products'])

@router.get('/products', response_model=list[ProductSchema])
def get_products(db:Session = Depends(get_db)):
    products = db.query(Product).all()
    return products
@router.get('/product/{product_id}', response_model=ProductSchema)
def get_product(product_id:int ,db:Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Товар не найден')
    return product