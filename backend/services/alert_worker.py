from database.connection import SessionLocal
from models.alert_model import Alert
from services.priority_service import get_priority
from services.email_service import send_email_alert
import redis
import json
import ast

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

print("🚀 Alert worker started... Waiting for alerts...")

while True:

    message = r.blpop("alerts_queue")

    if message:

        raw = message[1]
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            # Backward-compat for older queue items pushed with `str(dict)`
            # Example: "{'product': 'Milk A', 'stock_level': 'LOW'}"
            try:
                data = ast.literal_eval(raw)
            except Exception:
                print("⚠️  Skipping invalid alert payload:", raw)
                continue

        print("🔔 Processing alert:", data)

        db = SessionLocal()

        # NEW: calculate priority
        priority = get_priority(data["stock_level"])

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

        if priority in ["HIGH", "MEDIUM"]:
            send_email_alert(
                data["product"],
                data["stock_level"],
                data["camera_id"]
            )
        print("✅ Alert processed:", alert.id)

        db.close()
