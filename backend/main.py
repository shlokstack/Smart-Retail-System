from fastapi import FastAPI

from routes import detection
from routes import dashboard

from database.connection import engine
from database.base import Base
from models import detection_model

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app FIRST
app = FastAPI()

# Then include routers
app.include_router(detection.router)
app.include_router(dashboard.router)


@app.get("/")
def home():
    return {
        "message": "Smart Retail Backend Running"
    }