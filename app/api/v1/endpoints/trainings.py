from fastapi import APIRouter, Depends
from app.schemas.training_schema import TrainingPlanCreate, TrainingPlanOut
from app.core.database import get_database
from app.repositories.training_repository import TrainingRepository
from app.services.training_service import TrainingService

router = APIRouter()

@router.post("/", response_model=TrainingPlanOut)
async def assign_plan(plan: TrainingPlanCreate, db=Depends(get_database)):
    service = TrainingService(TrainingRepository(db))
    plan_id = await service.assign_plan(plan)
    return TrainingPlanOut(id=plan_id, **plan.dict())
