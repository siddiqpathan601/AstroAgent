# ── Hugging Face Spaces — AstroAgent Frontend ───────────────────────────────
# Static site served by Nginx
# Build the Vite app and serve the dist/ folder

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy source and build
COPY frontend/ .

# The backend HF Space URL must be set at build time as a build arg
# Pass it with: docker build --build-arg VITE_API_URL=https://...
ARG VITE_API_URL=https://YOUR_HF_USERNAME-astroagent-api.hf.space
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ── Serve with Nginx ─────────────────────────────────────────────────────────
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config for SPA — all routes serve index.html
RUN printf 'server {\n\
    listen 7860;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 7860

CMD ["nginx", "-g", "daemon off;"]
