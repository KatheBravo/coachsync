from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserCreate

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def create_user(self, user: UserCreate):
        user_dict = user.dict()
        return await self.repo.create_user(user_dict)