import redis
import time

redis_client = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)

print("🚀 Alert worker started... Waiting for alerts...")

while True:

    try:
        alert = redis_client.lpop("alerts_queue")

        if alert:

            print("🔔 Processing alert:", alert)

        time.sleep(1)

    except Exception as e:

        print("Error:", e)
        time.sleep(2)