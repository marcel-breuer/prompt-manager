#!/bin/bash
set -euo pipefail

docker compose -f docker-compose.yml -f docker-compose.override.yml up --build -d
docker compose -f docker-compose.yml -f docker-compose.override.yml exec -T app bun install
if docker compose -f docker-compose.yml -f docker-compose.override.yml exec -T app bash -lc "exit" >/dev/null 2>&1; then
  docker compose -f docker-compose.yml -f docker-compose.override.yml exec app bash
else
  docker compose -f docker-compose.yml -f docker-compose.override.yml exec app sh
fi
