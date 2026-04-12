from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from database.base import Base
from database.connection import engine
import models

# Import models so SQLAlchemy registers them on Base.metadata
from models.detection import Detection  # noqa: F401
from models.alert_model import Alert    # noqa: F401
from models.forecast_model import Forecast # noqa: F401

from routes import alerts, analytics, dashboard, detection, history
from routes.forecast import router as forecast_router

app = FastAPI(title="ShelfPulse AI Backend")

# --- CORS SETTINGS ---
# This is the "handshake" that allows your Vercel frontend to talk to Render.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://smart-retail-system-git-main-priyanshi-100506s-projects.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
            print("⚠️ Could not ensure alerts timestamp index:", e)

    print("✅ Database ready")

# --- ROUTERS ---
# Using standard prefixes makes your API calls cleaner in React
app.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
app.include_router(detection.router, prefix="/detection", tags=["Detection"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(history.router, prefix="/history", tags=["History"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(forecast_router, prefix="/forecast", tags=["Forecast"])

@app.get("/")
def home():
    return {"message": "Smart Retail Backend Running", "docs": "/docs"}


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
        # Note: Added socket_timeout so it doesn't hang if Redis isn't there
        r = redis.Redis(host="localhost", port=6379, socket_timeout=1)
        r.ping()
    except Exception:
        redis_status = "stopped"
        # Only mark unhealthy if DB is also down; Redis might be optional
        if db_status == "disconnected":
            overall_status = "unhealthy"

    return {
        "status": overall_status, 
        "database": db_status, 
        "redis": redis_status
    }
