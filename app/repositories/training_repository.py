class TrainingRepository:
    def __init__(self, db):
        self.collection = db["trainings"]

    async def create_plan(self, plan_data: dict):
        result = await self.collection.insert_one(plan_data)
        return str(result.inserted_id)
