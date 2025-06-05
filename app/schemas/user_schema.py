from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    role: str  # "coach" o "client"

class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str
