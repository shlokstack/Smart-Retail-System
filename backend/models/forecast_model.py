from sqlalchemy import Column, Integer, String, Float, DateTime
from database.base import Base
from datetime import datetime


class Forecast(Base):

    __tablename__ = "forecasts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    product = Column(
        String,
        index=True
    )

    forecast_date = Column(
        DateTime,
        index=True
    )

    predicted_demand = Column(
        Float
    )

    lower_bound = Column(
        Float
    )

    upper_bound = Column(
        Float
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )