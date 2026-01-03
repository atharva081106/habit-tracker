from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://habit-tracker.vercel.app",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/habits", response_model=list[schemas.HabitOut])
def get_habits(db: Session = Depends(get_db)):
    return db.query(models.Habit).all()

@app.post("/habits", response_model=schemas.HabitOut)
def create_habit(h: schemas.HabitCreate, db: Session = Depends(get_db)):
    habit = models.Habit(
        name=h.name,
        goal=h.goal,
        completed_days=[]
    )
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return habit

@app.post("/habits/{habit_id}/toggle", response_model=schemas.HabitOut)
def toggle_day(habit_id: int, data: schemas.ToggleDay, db: Session = Depends(get_db)):
    habit = db.query(models.Habit).get(habit_id)
    if data.day in habit.completed_days:
        habit.completed_days.remove(data.day)
    else:
        habit.completed_days.append(data.day)

    db.commit()
    db.refresh(habit)
    return habit

@app.get("/stats")
def stats(db: Session = Depends(get_db)):
    habits = db.query(models.Habit).all()
    total = sum(h.goal for h in habits)
    completed = sum(len(h.completed_days) for h in habits)
    success = round((completed / total) * 100) if total else 0
    return {"completed": completed, "total": total, "success": success}
