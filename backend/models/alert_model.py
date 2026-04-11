from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database.base import Base


class Alert(Base):

    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String)
    stock_level = Column(String)
    camera_id = Column(String)
    status = Column(String, default="OPEN")
    priority = Column(String)
    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )
