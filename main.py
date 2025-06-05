from fastapi import FastAPI
from app.api.v1.endpoints import users, trainings, ficha_cliente_router, historial_entrenamiento_router,progreso_cliente_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CoachSync")

app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(trainings.router, prefix="/api/v1/trainings", tags=["Trainings"])
app.include_router(ficha_cliente_router.router,prefix="/api/v1/ficha_cliente", tags=["Ficha_cliente"])
app.include_router(historial_entrenamiento_router.router,prefix="/api/v1/historial_cliente", tags=["Historial_Cliente"])
app.include_router(progreso_cliente_router.router, prefix="/api/v1/progreso_cliente",tags=["progreso_cliente"])

# CORS opcional
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cámbialo en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

