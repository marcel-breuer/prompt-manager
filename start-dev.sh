#!/bin/bash
set -euo pipefail

compose_files=(-f docker-compose.yml -f docker-compose.override.yml)

docker compose "${compose_files[@]}" up --build -d postgres
docker compose "${compose_files[@]}" run --rm --service-ports app sh -lc "rm -rf .next && bun install && bun dev"
