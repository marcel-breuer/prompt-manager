#!/bin/bash
set -euo pipefail

docker compose -f docker-compose.yml -f docker-compose.override.yml up --build -d
docker compose -f docker-compose.yml -f docker-compose.override.yml exec -T app bun install

if command -v devcontainer >/dev/null 2>&1; then
  devcontainer open .
elif command -v code >/dev/null 2>&1; then
  code .
else
  echo "No IDE CLI found (devcontainer/code)."
  echo "Install Dev Containers CLI or open the folder manually in your IDE."
fi

docker compose -f docker-compose.yml -f docker-compose.override.yml logs -f app
