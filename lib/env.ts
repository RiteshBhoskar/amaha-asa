
import z from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1).optional,
    GPT_API_KEY: z.string().min(1).optional,
})

export const env = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GPT_API_KEY: process.env.GPT_API_KEY,
})