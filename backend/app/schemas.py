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