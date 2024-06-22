import { PrismaClient } from "@prisma/client";
import { PrismaClient as PrismaPartnerDatabase } from ".prisma/partner";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  prismaPartnerDB: PrismaPartnerDatabase;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();
export const prismaPartnerDB = globalForPrisma.prismaPartnerDB || new PrismaPartnerDatabase();

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPartnerDB = prismaPartnerDB;
}
