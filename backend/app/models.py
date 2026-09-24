from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Enum, ForeignKey, BigInteger
from sqlalchemy.orm import relationship

from app.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(BigInteger, unique=True)
    first_name = Column(String)
    username = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True)
    price = Column(Integer, nullable=False)
    image_url = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=False)

class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    status =  Column(Enum('Оформляем', 'Собираем', 'Доставляем', 'Готов к получению'), default='Оформляем', nullable=False)
    created_at_order = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    total_price = Column(Integer, nullable=False)
    address = Column(String, nullable=False)
    items = relationship('OrderItem')

class OrderItem(Base):
    __tablename__ = 'orderItem'

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer,ForeignKey('orders.id'), nullable=False )
    product_id = Column(Integer,ForeignKey('products.id') ,nullable=False)
    product_name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    total_count = Column(Integer, nullable=False)
    order = relationship('Order')