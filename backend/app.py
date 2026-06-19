from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.chat import router as chat_router
from backend.config import PORT, HOST, DEBUG, CORS_ORIGINS

app = FastAPI(
    title="AstroAgent API",
    description="Backend API for AstroAgent — LangGraph + Groq (LLaMA 3.3 70B)",
    version="1.0.0"
)

# CORS — configurable via CORS_ORIGINS env var
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Mount the router
app.include_router(chat_router)


@app.get("/")
def read_root():
    return {"message": "AstroAgent API is running", "status": "ok"}


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "backend.app:app",
        host=HOST,
        port=PORT,
        reload=DEBUG,   # auto-reload only in debug/dev mode
    )
