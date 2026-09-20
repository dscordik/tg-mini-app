import os
import secrets
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
BOT_TOKEN = os.getenv('BOT_TOKEN')
ALGORITHM = 'HS256'
if (BOT_TOKEN == None):
    BOT_TOKEN = secrets.token_urlsafe(32)
    print(f'Используется временный ключ {BOT_TOKEN}')
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
if (SECRET_KEY == None):
    SECRET_KEY = secrets.token_urlsafe(32)
    print(f'Используется временный ключ {SECRET_KEY}')