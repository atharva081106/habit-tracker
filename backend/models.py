from sqlalchemy import Column, Integer, String
from sqlalchemy.types import JSON
from database import Base

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    goal = Column(Integer)
    completed_days = Column(JSON, default=list)
