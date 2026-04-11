import json
from database.connection import SessionLocal
from models.detection import Detection

db = SessionLocal()

print("Seeding detection history...")

with open("datasets/detection_history.json") as f:
    data = json.load(f)

for record in data:

    detection = Detection(
        product=record["product"],
        stock_level=record["stock_level"],
        camera_id=record["camera_id"]
    )

    db.add(detection)

db.commit()

print("Dataset inserted successfully")

db.close()
