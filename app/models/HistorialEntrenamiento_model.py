from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class HistorialEntrenamientoBase(BaseModel):
    fecha_sesion: datetime
    tipo_entrenamiento: str
    duracion_minutos: int
    descripcion: str
    observaciones: Optional[str] = None


class HistorialEntrenamientoCreate(HistorialEntrenamientoBase):
    cliente_id: str


class HistorialEntrenamientoResponse(HistorialEntrenamientoBase):
    id: str
    cliente_id: str

    class Config:
        orm_mode = True
