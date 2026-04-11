from fastapi import APIRouter
from database.connection import SessionLocal
from models.alert_model import Alert
from services.email_service import send_email_alert

router = APIRouter()

@router.get("/alerts")
def get_alerts():

    db = SessionLocal()

    alerts = db.query(Alert).all()

    result = []

    for a in alerts:
        result.append({
            "id": a.id,
            "product": a.product,
            "stock_level": a.stock_level,
            "camera_id": a.camera_id,
            "timestamp": a.timestamp,
            "status": a.status,
            "priority": a.priority
        })

    db.close()

    return result


@router.post("/alerts/test-email")
def test_email(data: dict | None = None):
    payload = data or {}
    send_email_alert(
        payload.get("product", "Test Product"),
        payload.get("stock_level", "LOW"),
        payload.get("camera_id", "TEST-CAM"),
    )
    return {"ok": True}
