from pydantic import BaseModel

class UserSchema(BaseModel):
    id:int
    telegram_id:int
    first_name:str
    username:str | None = None
    access_token:str

class TelegramAuthRequest(BaseModel):
    init_data:str