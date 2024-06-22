import { publicProcedure } from "@/api/services/trpc/trpc";

export const getHealth = publicProcedure.query(() => {
  return {
    status: "ok",
  };
});
