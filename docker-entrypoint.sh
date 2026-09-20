#!/bin/sh
set -e

echo "Running Prisma migrations..."
prisma db push --accept-data-loss --skip-generate

echo "Seeding the database..."
# Run the seed script if it exists
node prisma/seed.ts || echo "Seed script skipped or failed"

echo "Starting Next.js server..."
exec node server.js
