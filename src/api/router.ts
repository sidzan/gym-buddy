import { getHealth } from "@/api/handlers/getHealth";
import { router } from "./services/trpc/trpc";

export const apiRouter = router({
  getHealth: getHealth
});

export type ApiRouter = typeof apiRouter;
