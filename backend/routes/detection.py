from fastapi import APIRouter
from models.detection import Detection
from database.connection import SessionLocal
from services.redis_service import send_alert

router = APIRouter()


@router.post("/detection")
def receive_detection(data: dict):

    db = SessionLocal()

    try:
        # Create new detection record
        new_detection = Detection(
            product=data["product"],
            stock_level=data["stock_level"],
            camera_id=data["camera_id"]
        )

        # Save to database
        db.add(new_detection)
        db.commit()
        db.refresh(new_detection)

        print("Inserted ID:", new_detection.id)

        # Trigger alert if stock is low or empty
        if data["stock_level"] in ["LOW", "EMPTY"]:

            alert_data = {
                "product": data["product"],
                "stock_level": data["stock_level"],
                "camera_id": data["camera_id"]
            }

            send_alert(alert_data)

            print("Alert triggered:", alert_data)

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
