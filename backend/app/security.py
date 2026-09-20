from datetime import timedelta, datetime, timezone
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from jose import jwt, JWTError

def create_access_token(subject:str, expires_delta: timedelta | None = None)-> str:
    if expires_delta == None:
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