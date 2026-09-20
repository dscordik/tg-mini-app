from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine
from app.authtg import router as authtg_router

models.Base.metadata.create_all(bind=engine)
app = FastAPI(title='tg-mini-app', description='portfolio-project')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(authtg_router)

@app.get("/")
def root():
    return {"status": "ok"}
