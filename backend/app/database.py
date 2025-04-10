from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime

DATABASE_URL = "sqlite:///./backend.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

def init_db():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    user_count = db.query(User).count()
    
    if user_count == 0:
        random_user = User(
            username=f"user_{datetime.utcnow().timestamp()}",
            created_at=datetime.utcnow()
        )
        db.add(random_user)
        db.commit()
    
    db.close()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
