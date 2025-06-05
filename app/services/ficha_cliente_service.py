from app.repositories.ficha_cliente_repository import FichaClienteRepository
from app.schemas import ficha_cliente_schema
from fastapi import HTTPException
from bson import ObjectId


class FichaClienteService:
    def __init__(self, db):
        self.repository = FichaClienteRepository(db)

    async def crear_ficha(self, ficha_data: ficha_cliente_schema.FichaClienteCreate):
        ficha_dict = ficha_data
        ficha_dict["cliente_id"] = ficha_data.cliente_id
        return await self.repository.create_ficha(ficha_dict)

    async def obtener_ficha_por_cliente(self, cliente_id: str):
        ficha = await self.repository.get_by_cliente_id(cliente_id)
        if not ficha:
            raise HTTPException(status_code=404, detail="Ficha no encontrada")
        return ficha

    async def actualizar_ficha(self, cliente_id: str, update_data: dict):
        ficha_actualizada = await self.repository.update_ficha(cliente_id, update_data)
        if not ficha_actualizada:
            raise HTTPException(status_code=404, detail="Ficha no encontrada para actualizar")
        return ficha_actualizada

    async def eliminar_ficha(self, cliente_id: str):
        ficha_eliminada = await self.repository.delete_ficha(cliente_id)
        if not ficha_eliminada:
            raise HTTPException(status_code=404, detail="Ficha no encontrada para eliminar")
        return ficha_eliminada
