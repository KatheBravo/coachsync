from fastapi import APIRouter, Depends, HTTPException
from app.services.progreso_cliente_service import ProgresoClienteService
from app.schemas import progreso_cliente_schema
from app.core.database import get_database

router = APIRouter()


@router.post("/", response_model=dict)
async def registrar_progreso(
    progreso_data: progreso_cliente_schema.ProgresoClienteCreate,
    db=Depends(get_database)
):
    service = ProgresoClienteService(db)
    return await service.registrar_progreso(progreso_data)


@router.get("/cliente/{cliente_id}", response_model=list)
async def obtener_progreso(cliente_id: str, db=Depends(get_database)):
    service = ProgresoClienteService(db)
    return await service.listar_progreso_por_cliente(cliente_id)


@router.delete("/{progreso_id}", response_model=dict)
async def eliminar_progreso(progreso_id: str, db=Depends(get_database)):
    service = ProgresoClienteService(db)
    return await service.eliminar_progreso(progreso_id)
