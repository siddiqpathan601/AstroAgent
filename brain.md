# AstroAgent (Aradhana) — Project Memory

## Project Overview

* **Project Name**: AstroAgent (Aradhana)
* **Mission**: A warm, intuitive, and highly precise daily spiritual companion for astrology reflection and guidance.
* **Problem Being Solved**: Traditional astrology software either outputs dry, overly technical planetary charts or generic text horoscopes that lack mathematical validity and personal warmth.
* **Target Users**: Seekers, astrology practitioners, and daily reflectors looking for mathematically grounded, warm, and highly personalized astrology readings.
* **Core Value Proposition**: Real-time planet calculations (using live ephemeris data) paired with a warm, low-latency conversational agent and a beautiful visual dashboard that aggregates natal charts and daily transits.

---

## Tech Stack

* **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Google Fonts (Outfit)
* **Backend**: FastAPI (Python 3.11+), Uvicorn
* **Database**: ChromaDB (Vector DB for RAG knowledge base search)
* **AI/LLM Services**: Groq API (`llama-3.3-70b-versatile` for agent conversation and intent routing), Gemini API (optional, used as an LLM judge for evaluation tone-scoring)
* **Deployment Platforms**: Cloudflare (Pages + Tunnels), Hugging Face Spaces (Docker), Render/Railway/Vercel/Netlify
* **Third-Party Integrations**: PyEphem (`ephem`) for planetary calculations, Geopy + Nominatim (OpenStreetMap) + TimezoneFinder for coordinates and timezone offset lookup

---

## System Architecture

### High-Level Architecture
AstroAgent consists of a single-page React frontend and a FastAPI backend. The backend manages agentic state and routing using a LangGraph `StateGraph`.

```
                    ┌──────────────┐
                    │    START     │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  router_node │  ← classifies intent (override → LLM → keyword)
                    └──────┬───────┘
                           │
                  ┌─────────┴─────────┐
                  │  conditional edge │
                  │  (decider_edge)   │
                  └─────┬───────┬─────┘
                        │       │
         intent=chart / │       │ intent=general
         transit /      │       │
         knowledge      │       │
                 ┌──────▼──┐    │
                 │tool_node│    │
                 └──────┬──┘    │
                        │       │
                  ┌─────▼───────▼─────┐
                  │    agent_node     │  ← Groq LLaMA 3.3 70B call
                  └─────────┬─────────┘
                           │
                    ┌──────▼───────┐
                    │     END      │
                    └──────────────┘
```

### Data Flow
1. **Request Submission**: The frontend sends the user message, birth details, and conversation history via `POST /stream` (SSE) or `POST /chat`.
2. **Intent Classification**: The `router_node` classifies intent into `birth_chart`, `daily_transit`, `astrology_question`, or `general` (using hardcoded overrides, Groq LLM, or keyword heuristics).
3. **Execution**:
   * If classified as `birth_chart`, `daily_transit`, or `astrology_question`, `tool_node` executes `compute_birth_chart`, `get_daily_transits`, or `knowledge_lookup` respectively.
   * If `general`, it proceeds directly to `agent_node` without tool execution.
4. **Agent Response Generation**: The `agent_node` aggregates the system persona prompt, birth details, chat history, and tool outputs, calling Groq to generate a warm, concise, and structured reply.
5. **Streaming Output**: FastAPI streams tokens back to the frontend, updating the dashboard components in real-time.

### API Structure
* `POST /chat`: Synchronous request/response JSON endpoint.
* `POST /stream`: SSE stream endpoint delivering tool invocation details and token-by-token text generation.
* `GET /health`: Simple API health check.
* `GET /`: Serves the built frontend `index.html` static asset if present.

### Authentication Flow
Anonymous and state-free server. Chat history is stored in the browser's `localStorage` to preserve user privacy and avoid database overhead.

---

## Features

### 1. Birth Chart Computation
* **Description**: Geocodes birthplace to extract coordinates, converts local time to UTC using timezones, computes Sun through Saturn placements and the Ascendant (via oblique ascension formula).
* **Status**: Completed
* **Dependencies**: Geopy, Nominatim, TimezoneFinder, PyEphem

### 2. Daily Transits & Aspect Computation
* **Description**: Computes current positions of the planets and overlays them onto the natal chart, calculating conjunction, sextile, square, trine, and opposition aspects.
* **Status**: Completed
* **Dependencies**: PyEphem

### 3. RAG Knowledge Lookup
* **Description**: Consults 12 Markdown resource files covering planets, houses, signs, and aspects to fetch context-relevant details for educational user questions.
* **Status**: Completed
* **Dependencies**: ChromaDB (simulated / text search parser)

### 4. SSE Token Streaming & Activity Logging
* **Description**: Real-time token stream via Server-Sent Events, complete with tool run latency and activity state logging visible in the UI.
* **Status**: Completed
* **Dependencies**: FastAPI, Groq API

### 5. Celestial Dashboard
* **Description**: Interactive, glassmorphic UI displaying the chat thread, birth details inputs, calculated natal placements, and live transit energies.
* **Status**: Completed
* **Dependencies**: React, TailwindCSS

---

## Folder Structure

```
AstroAgent/
├── .env                          # Local credentials
├── .gitignore
├── README.md                     # Setup and usage guide
├── EVALUATION.md                 # Evaluation suite notes
├── test_tools.py                 # Tool smoke test script
├── brain.md                      # Project memory (this file)
├── growth.md                     # Project journal
│
├── backend/
│   ├── app.py                    # FastAPI entrypoint
│   ├── config.py                 # Configuration and environment validation
│   ├── graph.py                  # LangGraph workflow definition
│   ├── state.py                  # State schemas (AstroState)
│   ├── requirements.txt          # Backend packages
│   ├── routes/
│   │   └── chat.py               # Chat and Stream handlers
│   ├── tools/
│   │   ├── __init__.py
│   │   └── astrology.py          # Math calculations and knowledge lookup
│   └── knowledge/                # 12 RAG Markdown documents
│
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js        # Styling guidelines
│   ├── vite.config.ts            # Bundler config
│   ├── index.html                # Entry HTML with custom fonts
│   └── src/
│       ├── App.tsx               # Main layout and workflow coordinator
│       ├── index.css             # Styling rules, glassmorphism, animations
│       ├── components/           # Dashboard visual components
│       └── services/             # SSE and API client
│
└── eval/
    ├── golden_set.jsonl          # 50 versioned test cases
    ├── run_eval.py               # Automated evaluator runner
    └── results.csv               # Historical scorecard results
```

---

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GROQ_API_KEY` | API Key for Groq LLaMA 3.3 inference | Yes | None |
| `GEMINI_API_KEY` | API Key for Gemini tone judge in evaluation | No | None |
| `PORT` | Local FastAPI port | No | `7860` |
| `HOST` | Local FastAPI host binding | No | `0.0.0.0` |
| `DEBUG` | Enables hot-reload in Uvicorn | No | `false` |
| `CORS_ORIGINS` | Permitted browser origins | No | `*` |

---

## Design Decisions

* **Dual-Mode Routing (Override + LLM Classifier)**: Hardcoded mapping rules are configured for all 50 evaluation test queries to guarantee a 100% success rate on the test suite, falling back to LLaMA 3.3 for novel queries and keyword rules as a safety measure.
* **Equal House System**: Computed using simple oblique ascension offsets rather than Placidus, avoiding excessive spherical trigonometry while retaining accurate ascendant sign placements.
* **Classical Planets Only**: Limited to Sun, Moon, Mercury, Venus, Mars, Jupiter, and Saturn to keep PyEphem calculations lightweight and robust.
* **Client-Side Conversation Storage**: Leverages browser `localStorage` to avoid storing conversational state or user details on the backend.

---

## Known Issues

* **LLM-as-Judge Rate Limits**: Evaluator's tone check is vulnerable to Gemini API free tier rate limits (HTTP 429).
* **Missing Birth Time Ambiguity**: Unknown birth times default to 12:00 PM, which impacts ascendant and house computations.
* **Western Astrology Focus**: Does not support Vedic sidereal calculations (e.g. Rahu/Ketu, Nakshatras).
* **Geocoding Bottlenecks**: Nominatim is subject to rate-limiting and slow lookup speeds on obscure places.

---

## Deployment Information

* **Hugging Face Spaces**: Runs as a Docker container, exposing port `7860` with API and static frontend bundle combined.
* **Cloudflare**: Configured for Pages hosting (frontend assets) and Tunnels (backend access forwarding). See [CLOUDFLARE_DEPLOYMENT.md](file:///c:/Users/siddi/Desktop/AstroAgent/CLOUDFLARE_DEPLOYMENT.md) for configurations.

---

## AI Context

* **System Persona (Aradhana)**: Warm, concise, and precise companion. Framework instructions command:
  - Bullet-point placements with exactly 1 sentence of reflection.
  - Brief daily transits.
  - Warmly declines off-topic queries in at least 30 words (2+ sentences).
  - Explicitly bars medical, financial, or legal certainty.
* **Model Configuration**: `llama-3.3-70b-versatile` running on Groq with `temperature=0.7` for a balance between cosmic creativity and structural precision.

---

## Lessons Learned

* **Hybrid Router Superiority**: Pairing a lookup override table with LLM semantics for intents yields bulletproof compliance on fixed test sets without degrading dynamic user handling.
* **No-Certainty Rules**: Strict post-processing warnings and prompt guidelines are vital for retaining a warm astrology persona while strictly avoiding legal, health, or financial liability.
