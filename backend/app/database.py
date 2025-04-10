from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime
import random

DATABASE_URL = "sqlite:///./backend.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    hp = Column(Integer, default=100)
    level = Column(Integer, default=1)
    power = Column(Integer, default=10)
    intelligence = Column(Integer, default=10)
    charisma = Column(Integer, default=10)
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "stats": {
                "hp": self.hp,
                "level": self.level,
                "power": self.power,
                "intelligence": self.intelligence,
                "charisma": self.charisma
            }
        }

def init_db():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    user_count = db.query(User).count()
    
    if user_count == 0:
        random_user = User(
            username=f"user_{datetime.utcnow().timestamp()}",
            created_at=datetime.utcnow(),
            hp=random.randint(80, 120),
            level=random.randint(1, 5),
            power=random.randint(8, 15),
            intelligence=random.randint(8, 15),
            charisma=random.randint(8, 15)
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
