from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Dict

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    pass

class UserStats(BaseModel):
    hp: int
    level: int
    power: int
    intelligence: int
    charisma: int

class User(UserBase):
    id: int
    created_at: datetime
    stats: UserStats
    
    class Config:
        orm_mode = True
