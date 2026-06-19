"""
AstroAgent Configuration
========================
Loads environment variables from .env in the project root.

Required:
  GROQ_API_KEY     — Groq API key for LLaMA 3.3 70B inference

Optional:
  PORT             — Server port (default: 7860 for HF Spaces, 8000 local)
  HOST             — Server host (default: 0.0.0.0)
  DEBUG            — Enable uvicorn auto-reload (default: false)
  CORS_ORIGINS     — Comma-separated allowed origins (default: *)
"""

import os
from dotenv import load_dotenv

# Load .env from the project root (works when run as `python -m backend.app`)
load_dotenv()

GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
PORT: int = int(os.getenv("PORT", "7860"))
HOST: str = os.getenv("HOST", "0.0.0.0")
DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

# CORS — comma-separated list or "*"
_cors_raw: str = os.getenv("CORS_ORIGINS", "*")
CORS_ORIGINS: list[str] = (
    ["*"] if _cors_raw.strip() == "*"
    else [o.strip() for o in _cors_raw.split(",") if o.strip()]
)

if not GROQ_API_KEY:
    import warnings
    warnings.warn(
        "GROQ_API_KEY is not set. Set it in your .env file or as an environment variable. "
        "Get a free key at https://console.groq.com",
        RuntimeWarning,
        stacklevel=2,
    )
