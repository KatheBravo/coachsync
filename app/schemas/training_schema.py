from pydantic import BaseModel
from typing import List

class Exercise(BaseModel):
    name: str
    sets: int
    reps: int
    video_url: str

class TrainingPlanCreate(BaseModel):
    user_id: str
    title: str
    schedule: dict  # {"monday": [Exercise, Exercise], ...}

class TrainingPlanOut(BaseModel):
    id: str
    title: str
    user_id: str
    schedule: dict
