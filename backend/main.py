from fastapi import FastAPI
from sqlalchemy import text

from database.base import Base
from database.connection import engine

# Import models so SQLAlchemy registers them on Base.metadata
from models.detection import Detection  # noqa: F401
from models.alert_model import Alert  # noqa: F401

from routes import alerts, analytics, dashboard, detection, history

app = FastAPI()


@app.on_event("startup")
def _create_tables_on_startup():
    print("🔌 Connecting to database and ensuring tables exist...")
    Base.metadata.create_all(bind=engine, checkfirst=True)

    # Speed up trend queries on Postgres/Neon
    if engine.dialect.name == "postgresql":
        try:
            with engine.begin() as conn:
                conn.execute(text("CREATE INDEX IF NOT EXISTS ix_alerts_timestamp ON alerts (timestamp)"))
        except Exception as e:
            print("⚠️  Could not ensure alerts timestamp index:", e)

    print("✅ Database ready")


app.include_router(alerts.router)
app.include_router(detection.router)
app.include_router(dashboard.router)
app.include_router(history.router)
app.include_router(analytics.router)


@app.get("/")
def home():
    return {"message": "Smart Retail Backend Running"}


@app.get("/health")
def system_health():
    import redis

    db_status = "connected"
    redis_status = "running"
    overall_status = "healthy"

    # Check database
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
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

    return {"status": overall_status, "database": db_status, "redis": redis_status}

