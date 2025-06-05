from fastapi import APIRouter, Depends, HTTPException
from app.services.historial_entrenamiento_service import HistorialEntrenamientoService
from app.schemas import historial_entrenamiento_schema
from app.core.database import get_database

router = APIRouter()


@router.post("/", response_model=dict)
async def crear_sesion(
    sesion_data: historial_entrenamiento_schema.HistorialEntrenamientoCreate,
    db=Depends(get_database)
):
    service = HistorialEntrenamientoService(db)
    return await service.crear_sesion(sesion_data)


@router.get("/cliente/{cliente_id}", response_model=list)
async def obtener_sesiones(cliente_id: str, db=Depends(get_database)):
    service = HistorialEntrenamientoService(db)
    return await service.listar_sesiones_por_cliente(cliente_id)


@router.get("/{sesion_id}", response_model=dict)
async def obtener_sesion(sesion_id: str, db=Depends(get_database)):
    service = HistorialEntrenamientoService(db)
    return await service.obtener_sesion(sesion_id)


@router.delete("/{sesion_id}", response_model=dict)
async def eliminar_sesion(sesion_id: str, db=Depends(get_database)):
    service = HistorialEntrenamientoService(db)
    return await service.eliminar_sesion(sesion_id)
