from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from .database import init_db, get_db, User as DBUser
from .models import User

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/api/users", response_model=List[dict])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    return [user.to_dict() for user in users]
