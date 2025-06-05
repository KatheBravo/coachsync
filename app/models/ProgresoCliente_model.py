from typing import Dict
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class MedidasCorporales(BaseModel):
    pecho_cm: float
    cintura_cm: float
    cadera_cm: float
    brazo_cm: float
    pierna_cm: float


class ProgresoClienteBase(BaseModel):
    fecha_registro: datetime
    peso_kg: float
    porcentaje_grasa: Optional[float] = None
    medidas_corporales: MedidasCorporales
    notas_progreso: Optional[str] = None


class ProgresoClienteCreate(ProgresoClienteBase):
    cliente_id: str


class ProgresoClienteResponse(ProgresoClienteBase):
    id: str
    cliente_id: str

    class Config:
        orm_mode = True
