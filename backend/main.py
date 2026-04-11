from fastapi import FastAPI

from routes import detection
from routes import dashboard
from routes import alerts
from routes import history

from database.base import Base
from database.connection import engine
from models import detection_model
from models import alert_model

# Create FastAPI app FIRST
app = FastAPI()

@app.on_event("startup")
def _create_tables_on_startup():
    # Create database tables (fails fast if DB is unreachable)
    print("🔌 Connecting to database and ensuring tables exist...")
    Base.metadata.create_all(bind=engine, checkfirst=True)
    print("✅ Database ready")


# Then include routers
app.include_router(alerts.router)
app.include_router(detection.router)
app.include_router(dashboard.router)
app.include_router(history.router)


@app.get("/")
def home():
    return {
        "message": "Smart Retail Backend Running"
    }

@app.get("/health")
def system_health():

    from database.connection import engine
    import redis

    db_status = "connected"
    redis_status = "running"
    overall_status = "healthy"

    # Check database
    try:
        connection = engine.connect()
        connection.close()

    except Exception:
        db_status = "disconnected"
        overall_status = "unhealthy"

    # Check Redis
    try:
        r = redis.Redis(host="localhost", port=6379)
        r.ping()

    except Exception:
        redis_status = "stopped"
        overall_status = "unhealthy"

    return {
        "status": overall_status,
        "database": db_status,
        "redis": redis_status
    }