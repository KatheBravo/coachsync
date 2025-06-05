from fastapi import APIRouter, Depends
from app.services.user_service import UserService
from app.core.database import get_database
from app.repositories.user_repository import UserRepository
from app.models.user_model import UserCreate, UserOut


router = APIRouter()

def get_user_repository(db=Depends(get_database)) -> UserRepository:
    return UserRepository(db)

@router.post("/", response_model=UserOut)
async def create_user(user: UserCreate, repo: UserRepository = Depends(get_user_repository)):
    new_user = await repo.create_user(user.dict())
    return new_user

@router.get("/", response_model=list[UserOut])
async def list_users(repo: UserRepository = Depends(get_user_repository)):
    return await repo.list_users()

@router.get("/coach/{coach_id}/clients", response_model=list[UserOut])
async def get_clients(coach_id: str, repo: UserRepository = Depends(get_user_repository)):
    return await repo.get_clients_by_coach(coach_id)
