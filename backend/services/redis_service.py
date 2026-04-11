import redis
import json

# Create Redis connection
redis_client = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)

def send_alert(alert_data):
    """
    Push alert message to Redis queue
    """

    try:
        redis_client.rpush(
            "alerts_queue",
            json.dumps(alert_data)
        )

        print("Alert pushed to Redis:", alert_data)

    except Exception as e:

        print("Redis error:", e)
