from app.schemas.training_schema import TrainingPlanCreate
from app.repositories.training_repository import TrainingRepository

class TrainingService:
    def __init__(self, repo: TrainingRepository):
        self.repo = repo

    async def assign_plan(self, plan: TrainingPlanCreate):
        return await self.repo.create_plan(plan.dict())
