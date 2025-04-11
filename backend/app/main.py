from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

class Task(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    status: str = "pending"  # pending, in-progress, completed

tasks_db = {}

@app.post("/tasks", response_model=Task)
async def create_task(task: Task):
    if not task.id:
        task.id = str(uuid.uuid4())
    tasks_db[task.id] = task
    return task

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    return list(tasks_db.values())
