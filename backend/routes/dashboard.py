from fastapi import APIRouter
from database.connection import SessionLocal
from models.detection import Detection

# This line is REQUIRED
router = APIRouter()

@router.get("/dashboard")
def dashboard():

    db = SessionLocal()

    total_products = db.query(Detection).count()

    low_stock = db.query(Detection).filter(
        Detection.stock_level == "LOW"
    ).count()

    out_of_stock = db.query(Detection).filter(
        Detection.stock_level == "EMPTY"
    ).count()

    db.close()

    return {
        "total_products": total_products,
        "low_stock_items": low_stock,
        "out_of_stock_items": out_of_stock
    }
