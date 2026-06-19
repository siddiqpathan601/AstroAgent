# ── Stage 1: Build the React Frontend ──
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend code and build it
COPY frontend/ .

# For a single Docker container serving both, the frontend makes relative API calls.
# An empty VITE_API_URL causes the fetch calls to hit the same origin (host/port)
ENV VITE_API_URL=""
RUN npm run build

# ── Stage 2: Run the Python/FastAPI Backend ──
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies for ephem (C extension compilation)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source files and RAG knowledge base
COPY backend/ ./backend
COPY eval/ ./eval
COPY test_tools.py ./test_tools.py

# Copy the built React app from Stage 1 into the backend container
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose port 7860 (Hugging Face Spaces default port)
EXPOSE 7860

# Start the application using gunicorn with uvicorn workers, binding to port 7860
CMD ["gunicorn", "backend.app:app", \
     "--workers", "1", \
     "--worker-class", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:7860", \
     "--timeout", "120", \
     "--keep-alive", "5"]
