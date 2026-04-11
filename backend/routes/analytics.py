from fastapi import APIRouter
from database.connection import SessionLocal
from database.connection import engine
from models.alert_model import Alert
from sqlalchemy import func
from sqlalchemy import text
from datetime import datetime, timedelta, timezone

router = APIRouter()

@router.get("/alerts-trend")
def get_alerts_trend(hours: int = 24):

    db = SessionLocal()

    try:
        hours = max(1, min(168, int(hours)))

        if engine.dialect.name == "sqlite":
            # Store timestamps are UTC; show trend in IST (+05:30)
            ist_bucket = func.strftime(
                "%m-%d %H:00",
                func.datetime(Alert.timestamp, "+330 minutes"),
            )
            since = datetime.utcnow() - timedelta(hours=hours)
            base_query = db.query(Alert).filter(Alert.timestamp >= since)
        else:
            # Treat stored timestamp as UTC, convert to IST, then bucket by hour
            ist_ts = func.timezone("Asia/Kolkata", func.timezone("UTC", Alert.timestamp))
            ist_bucket_dt = func.date_trunc("hour", ist_ts)
            ist_bucket = func.to_char(ist_bucket_dt, "MM-DD HH24:00")
            base_query = db.query(Alert).filter(Alert.timestamp >= func.now() - text(f"interval '{hours} hours'"))

        results = (
            base_query.with_entities(
                ist_bucket.label("time"),
                func.count(Alert.id).label("alerts")
            )
            .group_by(ist_bucket)
            .order_by(ist_bucket)
            .all()
        )

        return [
            {
                "time": r.time,
                "alerts": r.alerts
            }
            for r in results
        ]

    finally:
        db.close()
