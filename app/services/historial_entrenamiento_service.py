from app.repositories.historial_repository import HistorialEntrenamientoRepository
from app.schemas import historial_entrenamiento_schema
from fastapi import HTTPException
from bson import ObjectId


class HistorialEntrenamientoService:
    def __init__(self, db):
        self.repository = HistorialEntrenamientoRepository(db)

    async def crear_sesion(self, sesion_data: historial_entrenamiento_schema.HistorialEntrenamientoCreate):
        return await self.repository.create_sesion(sesion_data)

    async def listar_sesiones_por_cliente(self, cliente_id: str):
        return await self.repository.get_sesiones_by_cliente_id(cliente_id)

    async def obtener_sesion(self, sesion_id: str):
        sesion = await self.repository.get_sesion_by_id(sesion_id)
        if not sesion:
            raise HTTPException(status_code=404, detail="Sesión no encontrada")
        return sesion

    async def eliminar_sesion(self, sesion_id: str):
        sesion = await self.repository.delete_sesion(sesion_id)
        if not sesion:
            raise HTTPException(status_code=404, detail="Sesión no encontrada para eliminar")
        return sesion
