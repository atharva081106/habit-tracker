from pydantic import BaseModel
from typing import List

class HabitCreate(BaseModel):
    name: str
    goal: int

class HabitUpdate(BaseModel):
    day: int

class HabitResponse(BaseModel):
    id: int
    name: str
    goal: int
    completed_days: List[int]

    class Config:
        from_attributes = True
