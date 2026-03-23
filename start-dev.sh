#!/bin/bash
set -euo pipefail

compose_files=(-f docker-compose.yml -f docker-compose.override.yml)

docker compose "${compose_files[@]}" up --build -d promptmanager-db
docker compose "${compose_files[@]}" run --rm -p "${APP_PORT:-3000}:3000" promptmanager-web sh -lc "mkdir -p .next && find .next -mindepth 1 -maxdepth 1 -exec rm -rf {} + && bun install && bun dev"
