from sqlalchemy import Column, Integer, String, Boolean, Date
from database import Base
from datetime import date

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    streak = Column(Integer, default=0)
    last_completed = Column(Date, nullable=True)
