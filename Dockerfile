# ── AstroAgent Backend — Koyeb / Docker Deployment ──────────────────────────
# Lightweight Python image with all backend dependencies.
# Exposes port 8000 (Koyeb default) using gunicorn + uvicorn workers.

FROM python:3.11-slim

# System deps for ephem (C extension)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python deps (layer cache)
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy full project
COPY . .

# Koyeb uses PORT env var (default 8000). HF Spaces uses 7860.
# The backend config.py reads PORT from env automatically.
EXPOSE 8000

CMD ["gunicorn", "backend.app:app", \
     "--workers", "1", \
     "--worker-class", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:8000", \
     "--timeout", "120", \
     "--keep-alive", "5"]
