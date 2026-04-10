from database.base import Base
from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

class Detection(Base):
    __tablename__ = "detections"
    
    id = Column(Integer, primary_key=True, index=True)
    product = Column(String, index=True)
    stock_level = Column(String)
    camera_id = Column(String, index=True)
    confidence = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow)

detection_model = Detection
