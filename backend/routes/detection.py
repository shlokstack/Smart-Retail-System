from fastapi import APIRouter
from models.detection_model import Detection
from database.connection import SessionLocal
from services.redis_service import send_alert

router = APIRouter()

@router.post("/detection")
def receive_detection(data: dict):

    db = SessionLocal()

    try:
        new_detection = Detection(
            product=data["product"],
            stock_level=data["stock_level"],
            camera_id=data["camera_id"]
        )

        db.add(new_detection)
        db.commit()
        # Trigger alert if needed
        if data["stock_level"] in ["LOW", "EMPTY"]:

            send_alert({
                "product": data["product"],
                "stock_level": data["stock_level"],
                "camera_id": data["camera_id"]
          })
        
        
        db.refresh(new_detection)

        print("Inserted ID:", new_detection.id)

        return {
            "message": "Detection stored in Neon",
            "id": new_detection.id
        }

    except Exception as e:
        db.rollback()
        print("ERROR:", e)

        return {
            "error": str(e)
        }

    finally:
        db.close()