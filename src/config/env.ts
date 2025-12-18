import dotenv from 'dotenv';
// zod is optional; if you don't want extra dependency, remove/zod usage
import { z } from 'zod';


dotenv.config();


const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.preprocess((v) => Number(v), z.number().int().positive().default(4000)),
    MONGODB_URI: z.string().min(1),
    CORS_ORIGIN: z.string().default('*'),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    GEMENI_API_KEY: z.string().min(1),
    EBAY_OAUTH_TOKEN: z.string().min(1),
});


const parsed = EnvSchema.safeParse(process.env);


if (!parsed.success) {
    // Print readable errors and exit
    // In production you may want to send this to a monitoring service
    // eslint-disable-next-line no-console
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
}


export const env = {
    NODE_ENV: parsed.data.NODE_ENV,
    PORT: parsed.data.PORT,
    MONGODB_URI: parsed.data.MONGODB_URI,
    CORS_ORIGIN: parsed.data.CORS_ORIGIN,
    LOG_LEVEL: parsed.data.LOG_LEVEL,
    GEMINI_API_KEY: parsed.data.GEMENI_API_KEY,
    EBAY_OAUTH_TOKEN: parsed.data.EBAY_OAUTH_TOKEN,
};