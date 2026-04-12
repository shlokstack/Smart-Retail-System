# 1. Use an official Python runtime as a parent image
FROM python:3.10-slim

# 2. Set environment variables to prevent Python from writing .pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Install system dependencies required for OpenCV, Prophet (C++ build), and PostgreSQL
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    gcc \
    g++ \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 4. Set the working directory in the container
WORKDIR /app

# 5. Copy the requirements file into the container
# We assume the Dockerfile is inside the /backend folder along with requirements.txt
COPY requirements.txt .

# 6. Install Python dependencies
# Using --no-cache-dir keeps the image size smaller (important for Render)
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 7. Copy the rest of the backend source code
COPY . .

# 8. Expose the port (Render handles this, but it's good practice)
EXPOSE 8000

# 9. Start the application using uvicorn
# We use the $PORT environment variable which Render provides automatically
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
