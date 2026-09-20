from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Enum, ForeignKey, BigInteger
from app.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(BigInteger, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
