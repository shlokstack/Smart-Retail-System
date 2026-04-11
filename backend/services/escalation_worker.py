import time
from datetime import datetime, timedelta

from database.connection import SessionLocal
from models.alert_model import Alert

CHECK_INTERVAL = 30      # seconds
ESCALATE_AFTER = 300     # 5 minutes


print("🚨 Escalation worker started...")

while True:

    db = SessionLocal()

    try:

        now = datetime.utcnow()

        alerts = db.query(Alert).filter(
            Alert.status == "OPEN",
            Alert.priority == "MEDIUM"
        ).all()

        for alert in alerts:

            alert_age = now - alert.timestamp

            if alert_age.total_seconds() > ESCALATE_AFTER:

                alert.priority = "HIGH"

                print(
                    "⚠️ Escalated alert:",
                    alert.product,
                    "ID:",
                    alert.id
                )

        db.commit()

    except Exception as e:

        print("ERROR:", e)

    finally:

        db.close()

    time.sleep(CHECK_INTERVAL)