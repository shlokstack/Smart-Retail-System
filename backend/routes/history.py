from fastapi import APIRouter
from database.connection import SessionLocal
from models.detection import Detection

router = APIRouter()


@router.get("/detections/history")
def get_detection_history():

    db = SessionLocal()

    try:

        records = db.query(Detection).all()

        result = []

        for r in records:

            result.append({
                "id": r.id,
                "product": r.product,
                "stock_level": r.stock_level,
                "camera_id": r.camera_id,
                "timestamp": r.timestamp
            })

        return result

    finally:
        db.close()
