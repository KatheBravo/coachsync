from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import Depends
import os

# Puedes usar dotenv o configurar las variables de entorno directamente
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://kabravo:ac7Etu52y1gHHU7Q@mytraining.jajpakh.mongodb.net/?retryWrites=true&w=majority&appName=Mytraining"
)

DB_NAME = os.getenv("DB_NAME", "training_programs")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

def get_database():
    return db
