import pandas as pd
from prophet import Prophet
from datetime import datetime

from database.connection import SessionLocal
from models.forecast_model import Forecast
from models.detection import Detection


class ForecastService:

    def generate_and_store_forecast(
        self,
        product: str,
        periods: int = 7
    ):

        db = SessionLocal()

        try:

            detections = (
                db.query(Detection)
                .filter(
                    Detection.product == product
                )
                .all()
            )

            if len(detections) < 2:

                return {
                    "error":
                    "Not enough data"
                }

            historical_data = []

            for d in detections:

                historical_data.append({
                    "ds": d.timestamp,
                    "y": 1
                })

            df = pd.DataFrame(
                historical_data
            )

            model = Prophet(
                daily_seasonality=True
            )

            model.fit(df)

            future = model.make_future_dataframe(
                periods=periods
            )

            forecast = model.predict(
                future
            )

            results = forecast[
                [
                    "ds",
                    "yhat",
                    "yhat_lower",
                    "yhat_upper"
                ]
            ].tail(periods)

            saved = []

            for _, row in results.iterrows():

                record = Forecast(
                    product=product,
                    forecast_date=row["ds"],
                    predicted_demand=max(
                        0,
                        float(row["yhat"])
                    ),
                    lower_bound=max(
                        0,
                        float(row["yhat_lower"])
                    ),
                    upper_bound=max(
                        0,
                        float(row["yhat_upper"])
                    )
                )

                db.add(record)

                saved.append({
                    "date":
                    str(row["ds"])
                })

            db.commit()

            return {
                "status":
                "forecast saved",
                "count":
                len(saved)
            }

        finally:

            db.close()


forecast_service = ForecastService()