from bson import ObjectId
from app.schemas.ficha_cliente_schema import FichaClienteCreate
from typing import Optional


class FichaClienteRepository:
    def __init__(self, db):
        self.collection = db["fichaCliente"]

    def serialize_ficha(self, ficha) -> dict:
        return {
            "_id": str(ficha["_id"]),
            "cliente_id": str(ficha["cliente_id"]),
            "edad": ficha["edad"],
            "peso_actual_kg": ficha["peso_actual_kg"],
            "altura_cm": ficha["altura_cm"],
            "condiciones_medicas": ficha.get("condiciones_medicas"),
            "restricciones": ficha.get("restricciones"),
            "preferencias_entrenamiento": ficha.get("preferencias_entrenamiento"),
            "objetivo": ficha.get("objetivo"),
            "fecha_registro": ficha["fecha_registro"].isoformat() if ficha.get("fecha_registro") else None
        }

    async def get_by_cliente_id(self, cliente_id: str) -> Optional[dict]:
        ficha = await self.collection.find_one({"cliente_id": cliente_id})
        if ficha:
            return self.serialize_ficha(ficha)
        return None

    async def create_ficha(self, ficha_data: FichaClienteCreate):
        ficha_dict = ficha_data.dict()
        result = await self.collection.insert_one(ficha_dict)
        ficha_dict["_id"] = str(result.inserted_id)

        return ficha_dict

    async def update_ficha(self, cliente_id: str, update_data: dict) -> Optional[dict]:
        result = await self.collection.find_one_and_update(
            {"cliente_id": cliente_id},
            {"$set": update_data},
            return_document=True
        )
        if result:
            return self.serialize_ficha(result)
        return None

    async def delete_ficha(self, cliente_id: str) -> bool:
        result = await self.collection.delete_one({"cliente_id": cliente_id})
        return result.deleted_count == 1
