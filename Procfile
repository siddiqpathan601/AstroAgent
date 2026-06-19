# Procfile — for Render / Railway / Heroku
# Hugging Face Spaces uses the Dockerfile instead
web: gunicorn backend.app:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT --timeout 120
