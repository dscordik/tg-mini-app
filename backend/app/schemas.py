from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


class UserSchema(BaseModel):
    id:int
    telegram_id:int
    first_name:str
    username:str | None = None
    access_token:str

class TelegramAuthRequest(BaseModel):
    init_data:str

class ProductSchema(BaseModel):
    id:int
    title:str
    price:int
    image_url:str
    category:str
    description:str

    model_config = ConfigDict(from_attributes=True)

class OrderItemCreate(BaseModel):
    total_count:int
    product_id:int

class OrderCreate(BaseModel):
    address: str
    items:list[OrderItemCreate]

class OrderItemOut(BaseModel):
    id: int
    order_id: int
    product_id:int
    product_name:str
    price:int
    total_count:int

    model_config = ConfigDict(from_attributes=True)

class OrderOut(BaseModel):
    id: int
    user_id: int | None = None
    address:str
    total_price: int
    status: Literal['Оформляем', 'Собираем', 'Доставляем', 'Готов к получению'] ='Оформляем'
    created_at_order: datetime
    items:list[OrderItemOut]

    model_config = ConfigDict(from_attributes=True)
