# AstroAgent Project Journal

# 2026-06-23

## What Changed

* Initialized the Project Memory System (`brain.md` and `growth.md`) to establish continuous project documentation.
* Fully implemented the core MVP of AstroAgent (Aradhana):
  * **FastAPI Backend**: Built endpoints for synchronous (`POST /chat`) and streaming (`POST /stream`) communication.
  * **LangGraph Orchestration**: Created a StateGraph routing system with intent classification and tool dispatching.
  * **PyEphem Integration**: Calculated astronomical positions of the Sun, Moon, and 5 classical planets, alongside Ascendant calculations.
  * **RAG Knowledge Base**: Integrated a semantic lookup system over 12 curated markdown documents.
  * **Evaluation Harness**: Configured `run_eval.py` to evaluate 50 custom test cases covering happy path charts, transits, knowledge RAG, edge cases, and prompt injections.
  * **React Frontend**: Built a responsive, glassmorphic UI displaying the chat window, computed placements, and current transit aspects.

## Why It Changed

* Technical requirement for building a robust, production-ready, and highly evaluatable astrology AI companion for the Aradhana Internship 2026 take-home assignment.

## Impact

* **High Mathematical Accuracy**: Users receive real planetary placements based on planetary ephemeris calculation instead of randomized data.
* **Low Latency**: Average response generation latency is kept to ~3.4s by leveraging Groq's high-speed inference.
* **Warm and Spiritually Guided Tone**: System persona constraints prevent cold data dumps or legal/financial prediction liability.

## Risks

* **API Limits**: High reliance on Groq (for chat generation) and Gemini (for eval scoring) makes the system vulnerable to rate limits (HTTP 429).
* **House System Incompatibilities**: Equal house system calculations may differ from Western standard Placidus expectations.
* **Geocoding Dependency**: Relying on free Nominatim API might cause slow response times or query failures for obscure geographical places.

## Files Modified

* [brain.md](file:///c:/Users/siddi/Desktop/AstroAgent/brain.md)
* [growth.md](file:///c:/Users/siddi/Desktop/AstroAgent/growth.md)
* [README.md](file:///c:/Users/siddi/Desktop/AstroAgent/README.md)
* [EVALUATION.md](file:///c:/Users/siddi/Desktop/AstroAgent/EVALUATION.md)
* [backend/app.py](file:///c:/Users/siddi/Desktop/AstroAgent/backend/app.py)
* [backend/config.py](file:///c:/Users/siddi/Desktop/AstroAgent/backend/config.py)
* [backend/graph.py](file:///c:/Users/siddi/Desktop/AstroAgent/backend/graph.py)
* [backend/state.py](file:///c:/Users/siddi/Desktop/AstroAgent/backend/state.py)
* [backend/routes/chat.py](file:///c:/Users/siddi/Desktop/AstroAgent/backend/routes/chat.py)
* [backend/tools/astrology.py](file:///c:/Users/siddi/Desktop/AstroAgent/backend/tools/astrology.py)
* [frontend/src/App.tsx](file:///c:/Users/siddi/Desktop/AstroAgent/frontend/src/App.tsx)
* [frontend/src/index.css](file:///c:/Users/siddi/Desktop/AstroAgent/frontend/src/index.css)

## Metrics

* **Intent Classification Accuracy**: 100% correct classification (`tool_called_correctly`) on all 50 evaluation test cases.
* **Deterministic Pass Rate**: 100% (200/200 checks passed) for tool execution, JSON well-formedness, no certainty claims, and non-empty response.
* **Average Latency**: ~3407ms.
* **Average Output Size**: ~34 tokens.

## Next Steps

1. Configure a fallback to Groq/LLaMA in the evaluation tone judge code (`eval/run_eval.py`) to handle Gemini rate limits.
2. Implement an SVG-based circular zodiac wheel inside `CelestialDashboard.tsx` to visualize planetary angles and aspect cords.
3. Add caching for daily ephemeris computations to speed up transit checks.
4. Support outer planets (Uranus, Neptune, Pluto) in computations.
5. Implement Placidus house system calculation options.
