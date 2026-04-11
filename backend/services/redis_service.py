import redis
import json

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
# SEND ALERT TO QUEUE
# =========================

def send_alert(alert_data: dict):

    try:

        redis_client.rpush(
            QUEUE_NAME,
            json.dumps(alert_data)
        )

        print(
            "📤 Alert pushed to Redis:",
            alert_data
        )

    except Exception as e:

        print(
            "❌ Redis error:",
            e
        )