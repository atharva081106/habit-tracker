from pydantic import BaseModel
from datetime import date
from typing import Optional

class HabitCreate(BaseModel):
    name: str

class HabitResponse(BaseModel):
    id: int
    name: str
    streak: int
    last_completed: Optional[date]

    class Config:
        from_attributes = True
