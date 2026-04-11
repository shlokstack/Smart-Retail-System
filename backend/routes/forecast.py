from fastapi import APIRouter
from database.connection import SessionLocal
from models.forecast_model import Forecast

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"]
)


@router.get("/{product}")
def get_forecast(product: str):

    db = SessionLocal()

    try:

        data = (
            db.query(Forecast)
            .filter(
                Forecast.product == product
            )
            .order_by(
                Forecast.forecast_date
            )
            .all()
        )

        return [
            {
                "date": f.forecast_date,
                "forecast": f.predicted_demand
            }
            for f in data
        ]

    finally:

        db.close()

@router.post("/generate/{product}")
def generate_forecast_now(product: str):

    from services.forecast_service import forecast_service

    result = forecast_service.generate_and_store_forecast(
        product=product
    )

    return result