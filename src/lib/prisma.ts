import { PrismaClient } from '@prisma/client';

const globalPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;
