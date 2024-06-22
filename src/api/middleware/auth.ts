import { TRPCError } from "@trpc/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { env } from "@/api/services/env/env";
import { middleware } from "@/api/services/trpc/trpc";

const verifier = CognitoJwtVerifier.create({
  userPoolId: env.AWS_COGNITO_USER_POOL_ID,
  clientId: env.AWS_COGNITO_CLIENT_ID,
  tokenUse: "id", // TODO: temporary until we switch to access token.
});

export const authMiddleware = middleware(async ({ ctx, next }) => {
  const apiKey = ctx.headers?.["x-api-key"];

  if (apiKey && apiKey === env.TEST_API_KEY) {
    return next({
      ctx: {
        ...ctx,
        accessToken: {
          sub: "test",
          email: "",
        },
      },
    });
  }
  const authorization = ctx.headers?.authorization?.split(" ")[1];

  if (!authorization) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Your request is missing authorization header",
    });
  }

  const accessToken = await verifier.verify(authorization).catch(() => {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Your access token is invalid or expired",
    });
  });

  return next({
    ctx: {
      ...ctx,
      accessToken,
    },
  });
});
