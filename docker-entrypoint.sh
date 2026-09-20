#!/bin/sh
set -e

echo "Running Prisma migrations..."
prisma db push --accept-data-loss --skip-generate

echo "Starting Next.js server..."
exec node server.js
