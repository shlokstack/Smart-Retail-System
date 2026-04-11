from fastapi import APIRouter
from models.detection import Detection
from database.connection import SessionLocal
from services.redis_service import send_alert
from models.alert_model import Alert

from datetime import datetime, timedelta

router = APIRouter()


@router.post("/detection")
def receive_detection(data: dict):

    db = SessionLocal()

    try:
        # =========================
        # STEP 1 — Store Detection
        # =========================

        new_detection = Detection(
            product=data["product"],
            stock_level=data["stock_level"],
            camera_id=data["camera_id"]
        )

        db.add(new_detection)
        db.commit()
        db.refresh(new_detection)

        print("Inserted detection ID:", new_detection.id)

        now = datetime.utcnow()

        # =========================
        # STEP 2 — ALERT LOGIC
        # =========================

        if data["stock_level"] in ["LOW", "EMPTY"]:

            # -------- CONFIG --------

            BURST_WINDOW = 30        # seconds
            MAX_ALERTS = 2           # allow first 2 alerts quickly
            COOLDOWN_SECONDS = 7200  # 2 hours

            # ------------------------

            # Get alerts in burst window
            recent_alerts = db.query(Alert).filter(
                Alert.product == data["product"],
                Alert.camera_id == data["camera_id"],
                Alert.status == "OPEN",
                Alert.timestamp >= now - timedelta(seconds=BURST_WINDOW)
            ).all()

            # Get latest alert
            last_alert = db.query(Alert).filter(
                Alert.product == data["product"],
                Alert.camera_id == data["camera_id"],
                Alert.status == "OPEN"
            ).order_by(Alert.timestamp.desc()).first()

            # =========================
            # PHASE 1 — BURST ALERTS
            # =========================

            if len(recent_alerts) < MAX_ALERTS:

                alert_data = {
                    "product": data["product"],
                    "stock_level": data["stock_level"],
                    "camera_id": data["camera_id"]
                }

                send_alert(alert_data)

                print("Burst alert sent")

            # =========================
            # PHASE 2 — COOLDOWN
            # =========================

            elif last_alert:

                time_diff = (
                    now - last_alert.timestamp
                ).total_seconds()

                if time_diff < COOLDOWN_SECONDS:

                    print("Cooldown active — alert suppressed")

                else:

                    alert_data = {
                        "product": data["product"],
                        "stock_level": data["stock_level"],
                        "camera_id": data["camera_id"]
                    }

                    send_alert(alert_data)

                    print("Cooldown expired — new alert sent")

        # =========================
        # STEP 3 — AUTO RESOLVE
        # =========================

        if data["stock_level"] == "FULL":

            existing_alert = db.query(Alert).filter(
                Alert.product == data["product"],
                Alert.camera_id == data["camera_id"],
                Alert.status == "OPEN"
            ).first()

            if existing_alert:

                existing_alert.status = "CLOSED"
                existing_alert.timestamp = datetime.utcnow()

                db.commit()

                print(
                    "Resolved alert ID:",
                    existing_alert.id
                )

        # =========================
        # RESPONSE
        # =========================

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