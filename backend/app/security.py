from datetime import timedelta, datetime, timezone
from fastapi.params import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from starlette import status
from starlette.exceptions import HTTPException

from app.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from jose import jwt, JWTError
from app.database import get_db
from app.models import User

httpBearer = HTTPBearer(auto_error=False)

def get_current_user(credentials:HTTPAuthorizationCredentials | None = Depends(httpBearer), db:Session = Depends(get_db))-> User:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Токен отсутствует', headers={'WWW-Authenticate':'Bearer'})
    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Токен недействителен', headers={'WWW-Authenticate':'Bearer'})
    telegram_id:str | None = payload.get('sub')
    if not telegram_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='В токене нет индентификатора',headers={'WWW-Authenticate': 'Bearer'})
    user = db.query(User).filter(User.telegram_id == int(telegram_id)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Пользователя не существует',headers={'WWW-Authenticate': 'Bearer'})
    return user

def create_access_token(subject:str, expires_delta: timedelta | None = None)-> str:
    if expires_delta is None:
        expire_delta_final = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    else:
        expire_delta_final = datetime.now(timezone.utc) + expires_delta
    payload = {
        'sub': subject,
        'exp': expire_delta_final,
        'type': 'access'
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token:str)-> dict | None:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None