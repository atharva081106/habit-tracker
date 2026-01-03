from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date, timedelta

from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Habit Tracker API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Root
@app.get("/")
def root():
    return {"message": "Habit Tracker API is running"}

# Add Habit
@app.post("/habits", response_model=schemas.HabitResponse)
def add_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Habit).filter(models.Habit.name == habit.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Habit already exists")

    new_habit = models.Habit(name=habit.name)
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit

# Get All Habits
@app.get("/habits", response_model=list[schemas.HabitResponse])
def get_habits(db: Session = Depends(get_db)):
    return db.query(models.Habit).all()

# Mark Habit as Done
@app.post("/habits/{habit_id}/complete", response_model=schemas.HabitResponse)
def complete_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    today = date.today()

    if habit.last_completed == today:
        return habit

    if habit.last_completed == today - timedelta(days=1):
        habit.streak += 1
    else:
        habit.streak = 1

    habit.last_completed = today
    db.commit()
    db.refresh(habit)
    return habit
