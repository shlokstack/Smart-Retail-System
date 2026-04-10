from sqlalchemy import Column, Integer, String
from database.base import Base

class Detection(Base):

    __tablename__ = "detections"

    # THIS LINE FIXES THE ERROR
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String)
    stock_level = Column(String)
    camera_id = Column(String)