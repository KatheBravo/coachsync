from app.repositories.progreso_repository import ProgresoClienteRepository
from app.schemas import progreso_cliente_schema
from fastapi import HTTPException
from bson import ObjectId


class ProgresoClienteService:
    def __init__(self, db):
        self.repository = ProgresoClienteRepository(db)

    async def registrar_progreso(self, progreso_data: progreso_cliente_schema.ProgresoClienteCreate):
        return await self.repository.create_progreso(progreso_data)

    async def listar_progreso_por_cliente(self, cliente_id: str):
        return await self.repository.get_progresos_by_cliente_id(cliente_id)

    async def eliminar_progreso(self, progreso_id: str):
        progreso = await self.repository.delete_by_id(progreso_id)
        if not progreso:
            raise HTTPException(status_code=404, detail="Registro de progreso no encontrado para eliminar")
        return progreso
