from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class FichaClienteBase(BaseModel):
    edad: int
    peso_actual_kg: float
    altura_cm: float
    condiciones_medicas: Optional[str] = None
    restricciones: Optional[str] = None
    preferencias_entrenamiento: Optional[str] = None
    objetivo: Optional[str] = None


class FichaClienteCreate(FichaClienteBase):
    cliente_id: str


class FichaClienteResponse(FichaClienteBase):
    id: str
    cliente_id: str
    fecha_registro: datetime

    class Config:
        orm_mode = True
