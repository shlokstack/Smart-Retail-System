import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

# Get DATABASE_URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Create database engine
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set. Update backend/.env with a valid DATABASE_URL.")

if "postgresql://USER:PASSWORD@HOST/DB" in DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is still the template value. Paste your real Neon Postgres connection string into backend/.env."
    )

engine_kwargs = {"pool_pre_ping": True}
if DATABASE_URL.startswith("sqlite"):
    # Needed for SQLite when used with FastAPI's threaded server.
    engine_kwargs["connect_args"] = {"check_same_thread": False}
elif DATABASE_URL.startswith("postgres"):
    # Avoid indefinite hangs on bad credentials/DNS/network issues.
    engine_kwargs["connect_args"] = {"connect_timeout": 10}

engine = create_engine(DATABASE_URL, **engine_kwargs)

# Create session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
