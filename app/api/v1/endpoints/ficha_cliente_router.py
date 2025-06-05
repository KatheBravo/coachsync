from fastapi import APIRouter, Depends, HTTPException
from app.services.ficha_cliente_service import FichaClienteService
from app.schemas import ficha_cliente_schema
from app.core.database import get_database

router = APIRouter()


@router.post("/", response_model=dict)
async def crear_ficha(
    ficha_data: ficha_cliente_schema.FichaClienteCreate,
    db=Depends(get_database)
):
    service = FichaClienteService(db)
    return await service.crear_ficha(ficha_data)


@router.get("/{cliente_id}", response_model=dict)
async def obtener_ficha(cliente_id: str, db=Depends(get_database)):
    service = FichaClienteService(db)
    return await service.obtener_ficha_por_cliente(cliente_id)


@router.put("/{cliente_id}", response_model=dict)
async def actualizar_ficha(cliente_id: str, update_data: dict, db=Depends(get_database)):
    service = FichaClienteService(db)
    return await service.actualizar_ficha(cliente_id, update_data)


@router.delete("/{cliente_id}", response_model=dict)
async def eliminar_ficha(cliente_id: str, db=Depends(get_database)):
    service = FichaClienteService(db)
    return await service.eliminar_ficha(cliente_id)
