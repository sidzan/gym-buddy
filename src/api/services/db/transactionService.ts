import { Prisma } from "@prisma/client";
import { prisma } from "@/api/services/db/prisma";

type Action<T> = (tx: Prisma.TransactionClient) => Promise<T>;

export async function runInTransaction<T>(action: Action<T>) {
  const MAX_RETRIES = 2;
  let retries = 0;

  while (retries <= MAX_RETRIES) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          return await action(tx);
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );

      break;
    } catch (error) {
      if (isTransactionOrDeadLockError(error)) {
        await delayWithJitter(1);
        retries++;
        continue;
      }

      throw error;
    }
  }
}

function isTransactionOrDeadLockError(error: unknown): error is boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2034";
}

function delayWithJitter(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.round(Math.random() * seconds * 1000));
  });
}
