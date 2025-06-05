from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from bson import ObjectId

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Literal["coach", "client"]
    coach_id: Optional[str] = None  # Para vincular cliente con entrenador

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str = Field(..., alias="_id")
    name: str
    email: EmailStr
    role: str
    coach_id: Optional[str]  # Debe ser str si es ObjectId serializado

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
