from database.connection import SessionLocal
from models.alert_model import Alert
from services.priority_service import get_priority
from services.email_service import send_email_alert

import redis
import json
import time

# =========================
# REDIS CONNECTION
# =========================

r = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)

QUEUE_NAME = "alerts_queue"


# =========================
# WORKER
# =========================

def start_worker():

    print("🚀 Alert worker started... Waiting for alerts...")

    while True:

        try:

            message = r.brpop(QUEUE_NAME)

            if not message:
                continue

            data = json.loads(message[1])

            print("🔔 Processing alert:", data)

            db = SessionLocal()

            # =========================
            # PRIORITY LOGIC
            # =========================

            priority = get_priority(
                data["stock_level"]
            )

            alert = Alert(
                product=data["product"],
                stock_level=data["stock_level"],
                camera_id=data["camera_id"],
                status="OPEN",
                priority=priority
            )

            db.add(alert)
            db.commit()
            db.refresh(alert)

            print("Priority:", priority)
            print("✅ Alert saved with ID:", alert.id)

            # =========================
            # EMAIL ALERT
            # =========================

            if priority in ["HIGH", "MEDIUM"]:

                send_email_alert(
                    data["product"],
                    data["stock_level"],
                    data["camera_id"]
                )

                print("📧 Email sent")

            db.close()

        except Exception as e:

            print("Worker error:", e)

            time.sleep(2)


# =========================
# START WORKER
# =========================

if __name__ == "__main__":

    start_worker()