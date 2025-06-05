from app.core.database import get_database
from fastapi import Depends
from typing import List
from bson import ObjectId
from app.core.database import get_database

class UserRepository:
    def __init__(self, db):
        self.collection = db["users"]

    def serialize_user(self,user) -> dict:
        return {
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "coach_id": str(user["coach_id"]) if "coach_id" in user and user["coach_id"] else None
        }

    async def create_user(self, user_data: dict):
        result = await self.collection.insert_one(user_data)
        user_data["_id"] = str(result.inserted_id)
        return user_data

    async def get_user_by_id(self, user_id: str):
        return await self.collection.find_one({"_id": ObjectId(user_id)})

    async def list_users(self):
        users = []
        async for user in self.collection.find():
            users.append(self.serialize_user(user))
        return users

    async def get_clients_by_coach(self, coach_id: str):
        cursor = self.collection.find({"coach_id": coach_id})
        clients = []
        async for user in cursor:
            clients.append(self.serialize_user(user))
        return clients