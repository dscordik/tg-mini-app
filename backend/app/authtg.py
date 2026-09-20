from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette import status
from app.config import BOT_TOKEN
from app.database import get_db
from app.models import User
from app.schemas import TelegramAuthRequest
from app.security import create_access_token, decode_token
from app.telegram_auth import verify_init_data

router = APIRouter(prefix='/api', tags=['auth'])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/telegram")

@router.post('/auth/telegram')
def tg_api(req:TelegramAuthRequest, db:Session = Depends(get_db)):
    is_valid = verify_init_data(req.init_data, bot_token=BOT_TOKEN)
    if is_valid is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Неверный запрос')
    user = db.query(User).filter(User.telegram_id == is_valid['id']).first()
    if user is None:
        user = User(
            telegram_id=is_valid['id'],
            first_name=is_valid.get('first_name'),
            username = is_valid.get('username')
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    access_token = create_access_token(subject=str(is_valid['id']))
    return {
        'id':user.id,
        'telegram_id':user.telegram_id,
        'first_name':user.first_name,
        'username':user.username,
        'access_token':access_token
    }

@router.get('/me')
def get_tg_me(token:str = Depends(oauth2_scheme),db:Session = Depends(get_db)):
    payload=decode_token(token)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Токен не найден')
    user = db.query(User).filter(User.telegram_id == int(payload['sub'])).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Пользователь не найден')
    return {
        'id':user.id,
        'telegram_id':user.telegram_id,
        'first_name': user.first_name,
        'username': user.username
    }