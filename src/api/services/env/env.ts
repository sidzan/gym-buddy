import { z } from "zod";

export const env = z
  .object({
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    PARTNER_DATABASE_URL: z.string(),
    NS_ACCOUNT_ID: z.string(),
    NS_CONSUMER_KEY: z.string(),
    NS_CONSUMER_SECRET: z.string(),
    NS_TOKEN_KEY: z.string(),
    NS_TOKEN_SECRET: z.string(),
    NS_HOST: z.string(),
    AWS_COGNITO_USER_POOL_ID: z.string(),
    AWS_COGNITO_CLIENT_ID: z.string(),
    TEST_API_KEY: z.string().optional(),
    AWS_CONTENT_BUCKET: z.string(),
  })
  .parse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    PARTNER_DATABASE_URL: process.env.PARTNER_DATABASE_URL,
    NS_ACCOUNT_ID: process.env.NS_ACCOUNT_ID,
    NS_CONSUMER_KEY: process.env.NS_CONSUMER_KEY,
    NS_CONSUMER_SECRET: process.env.NS_CONSUMER_SECRET,
    NS_TOKEN_KEY: process.env.NS_TOKEN_KEY,
    NS_TOKEN_SECRET: process.env.NS_TOKEN_SECRET,
    NS_HOST: process.env.NS_HOST,
    AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
    TEST_API_KEY: process.env.TEST_API_KEY,
    AWS_CONTENT_BUCKET: process.env.TEST_API_KEY,
  });
