# 🤗 AstroAgent — Hugging Face Spaces Deployment Guide

This guide details how to deploy the entire **AstroAgent** application (React frontend + FastAPI backend) as a single container inside your Hugging Face Space (`siddiqpathan601/Astroagent`).

---

## 🚀 Unified Architecture

We have unified the codebase to build and run as a single container:
1. **Frontend compilation:** The React app is built into static files (`frontend/dist/`).
2. **FastAPI mounting:** FastAPI statically mounts the React build directory and serves it on `/` and `/assets`.
3. **SPA Routing:** Unmatched routes (like `/chat`, `/transits`, etc.) fall back to serving `index.html` dynamically, supporting client-side routing on refreshes.
4. **Port 7860:** The unified server runs on port `7860` as required by Hugging Face Spaces.

---

## 🛠️ Deployment Steps

Follow these terminal commands to deploy your local code to Hugging Face:

### Step 1: Commit Your Staged Changes
Ensure all your local changes (including the new `Dockerfile` and `backend/app.py`) are committed locally:
```powershell
git commit -m "Set up unified full-stack Docker configuration for Hugging Face"
```

### Step 2: Add Hugging Face as a Git Remote
Add your Hugging Face Space repository as a remote named `hf`:
```powershell
git remote add hf https://huggingface.co/spaces/siddiqpathan601/Astroagent
```

### Step 3: Push to Hugging Face
Push your `main` branch directly to the Hugging Face Space:
```powershell
git push -u hf main
```
*Note: When prompted for credentials:*
- **Username:** `siddiqpathan601` (your Hugging Face username)
- **Password:** Your Hugging Face **Access Token** with **Write** permissions (generate one under [Settings → Access Tokens](https://huggingface.co/settings/tokens)).

---

## ⚙️ Environment Variables (Secrets)

Once the push starts building, configure the necessary API keys in your Hugging Face Space:

1. In your Hugging Face Space, click **Settings** (near the top right).
2. Scroll down to **Variables and secrets**.
3. Click **New secret** and add:
   - **Key:** `GROQ_API_KEY`
   - **Value:** `gsk_xxxxxxxx...` (your Groq API key)
4. *(Optional)* If you want to use the evaluation harness tone scoring:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSy_xxxxx...`

Hugging Face will automatically rebuild and start your Space. You will be able to access your full application at:
`https://huggingface.co/spaces/siddiqpathan601/Astroagent`
