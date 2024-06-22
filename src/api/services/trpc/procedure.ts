import { authMiddleware } from "@/api/middleware/auth";
import { publicProcedure } from "@/api/services/trpc/trpc";

export const procedure = publicProcedure.use(authMiddleware);
