from pydantic import BaseModel
from typing import List

class HabitCreate(BaseModel):
    name: str
    goal: int

class ToggleDay(BaseModel):
    day: int

class HabitOut(BaseModel):
    id: int
    name: str
    goal: int
    completed_days: List[int]

    class Config:
        from_attributes = True
