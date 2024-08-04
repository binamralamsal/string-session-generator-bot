import { z } from "zod";

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, "Please enter bot token"),
  PORT: z.coerce.number().default(3000),
});

export const env = envSchema.parse(process.env);
