#!/bin/bash
set -euo pipefail

compose_files=(-f docker-compose.yml -f docker-compose.override.yml)

docker compose "${compose_files[@]}" up --build -d postgres
docker compose "${compose_files[@]}" run --rm --service-ports app sh -lc "mkdir -p .next && find .next -mindepth 1 -maxdepth 1 -exec rm -rf {} + && bun install && bun dev"
