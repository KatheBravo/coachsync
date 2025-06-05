from bson import ObjectId
from app.schemas.historial_entrenamiento_schema import HistorialEntrenamientoCreate
from typing import Optional, List


class HistorialEntrenamientoRepository:
    def __init__(self, db):
        self.collection = db["historialEntrenamiento"]

    def serialize_sesion(self, sesion) -> dict:
        return {
            "_id": str(sesion["_id"]),
            "cliente_id": sesion["cliente_id"],
            "fecha_sesion": str(sesion["fecha_sesion"]),
            "tipo_entrenamiento": sesion["tipo_entrenamiento"],
            "duracion_minutos": sesion["duracion_minutos"],
            "descripcion": sesion["descripcion"],
            "observaciones": sesion.get("observaciones"),
        }

    async def create_sesion(self, sesion_data: HistorialEntrenamientoCreate):
        data_dict = sesion_data.dict()
        result = await self.collection.insert_one(data_dict)
        data_dict["_id"] = str(result.inserted_id)
        return data_dict

    async def get_sesiones_by_cliente_id(self, cliente_id: str) -> List[dict]:
        sesiones = []
        cursor = self.collection.find({"cliente_id": cliente_id})
        async for sesion in cursor:
            sesiones.append(self.serialize_sesion(sesion))
        return sesiones

    async def get_sesion_by_id(self, sesion_id: str) -> Optional[dict]:
        sesion = await self.collection.find_one({"_id": ObjectId(sesion_id)})
        if sesion:
            return self.serialize_sesion(sesion)
        return None

    async def update_sesion(self, sesion_id: str, update_data: dict) -> Optional[dict]:
        result = await self.collection.find_one_and_update(
            {"_id": ObjectId(sesion_id)},
            {"$set": update_data},
            return_document=True
        )
        if result:
            return self.serialize_sesion(result)
        return None

    async def delete_sesion(self, sesion_id: str) -> bool:
        result = await self.collection.delete_one({"_id": ObjectId(sesion_id)})
        return result.deleted_count == 1
