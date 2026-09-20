import { PrismaClient } from "@prisma/client";

// In development, Next.js can clear the module cache, so we want to 
// preserve the Prisma Client instance to avoid exhausting DB connections.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
