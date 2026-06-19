import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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
    frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
    index_file = os.path.join(frontend_dist, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "AstroAgent API is running", "status": "ok"}


@app.get("/health")
def health():
    return {"status": "ok"}


# Serve static assets and catch-all SPA routing if frontend dist exists
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="static")

    @app.get("/{catchall:path}")
    def serve_frontend(catchall: str):
        # Prevent intercepting API routes
        if catchall.startswith(("chat", "stream", "health", "docs", "redoc", "openapi.json")):
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail="Not Found")
        
        index_file = os.path.join(frontend_dist, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"message": "Frontend build files missing."}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "backend.app:app",
        host=HOST,
        port=PORT,
        reload=DEBUG,   # auto-reload only in debug/dev mode
    )
