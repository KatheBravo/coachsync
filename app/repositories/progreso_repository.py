from bson import ObjectId
from app.schemas.progreso_cliente_schema import ProgresoClienteCreate
from typing import Optional, List


class ProgresoClienteRepository:
    def __init__(self, db):
        self.collection = db["progresoCliente"]

    def serialize_progreso(self, progreso) -> dict:
        return {
            "_id": str(progreso["_id"]),
            "cliente_id": progreso["cliente_id"],
            "fecha_registro": str(progreso["fecha_registro"]),
            "peso_kg": progreso["peso_kg"],
            "porcentaje_grasa": progreso.get("porcentaje_grasa"),
            "medidas_corporales": progreso["medidas_corporales"],
            "notas_progreso": progreso.get("notas_progreso"),
        }

    async def create_progreso(self, progreso_data: ProgresoClienteCreate):
        data_dict = progreso_data.dict()
        result = await self.collection.insert_one(data_dict)
        data_dict["_id"] = str(result.inserted_id)
        return data_dict

    async def get_progresos_by_cliente_id(self, cliente_id: str) -> List[dict]:
        progresos = []
        cursor = self.collection.find({"cliente_id": cliente_id})
        async for progreso in cursor:
            progresos.append(self.serialize_progreso(progreso))
        return progresos

    async def get_progreso_by_id(self, progreso_id: str) -> Optional[dict]:
        progreso = await self.collection.find_one({"_id": ObjectId(progreso_id)})
        if progreso:
            return self.serialize_progreso(progreso)
        return None

    async def update_progreso(self, progreso_id: str, update_data: dict) -> Optional[dict]:
        result = await self.collection.find_one_and_update(
            {"_id": ObjectId(progreso_id)},
            {"$set": update_data},
            return_document=True
        )
        if result:
            return self.serialize_progreso(result)
        return None

    async def delete_progreso(self, progreso_id: str) -> bool:
        result = await self.collection.delete_one({"_id": ObjectId(progreso_id)})
        return result.deleted_count == 1
