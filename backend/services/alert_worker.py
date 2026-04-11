import redis
import json
import time

from services.alert_service import create_alert


# =========================
# REDIS CONNECTION
# =========================

redis_client = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)

QUEUE_NAME = "alerts_queue"


# =========================
# WORKER
# =========================

def start_worker():

    print(
        "🚀 Alert worker started... Waiting for alerts..."
    )

    while True:

        try:

            message = redis_client.brpop(
                QUEUE_NAME
            )

            if not message:
                continue

            data = json.loads(
                message[1]
            )

            print(
                "🔔 Processing alert:",
                data
            )

            create_alert(
                data
            )

        except Exception as e:

            print(
                "❌ Worker error:",
                e
            )

            time.sleep(2)


# =========================
# START WORKER
# =========================

if __name__ == "__main__":

    start_worker()