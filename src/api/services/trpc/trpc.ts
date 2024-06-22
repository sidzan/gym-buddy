import { env } from "@/api/services/env/env";
import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { ZodError } from "zod";

const t = initTRPC.context<typeof createTrpcContext>().create({
  errorFormatter({ shape, error }) {
    if (env.NODE_ENV !== "production") {
      return shape;
    }

    return {
      ...shape,
      message:
        error.code === "BAD_REQUEST" && error.cause instanceof ZodError
          ? "Please check your input and try again."
          : error.code === "INTERNAL_SERVER_ERROR"
            ? "Something went wrong. Please try again."
            : error.message,
    };
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

export const createTrpcContext = (options: FetchCreateContextFnOptions) => {
  return {
    headers: Object.fromEntries(Array.from(options?.req.headers.entries())),
  };
};
