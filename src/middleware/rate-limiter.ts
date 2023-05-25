import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();

const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX as string
const RATE_LIMIT_TIME = process.env.RATE_LIMIT_TIME as string

export const rateLimiter = rateLimit({
    windowMs: parseInt(RATE_LIMIT_TIME),
    max: parseInt(RATE_LIMIT_MAX),
    message: `You have exceeded 25 request limit, limit will expire in 3hrs`,
    standardHeaders: false,
    legacyHeaders: false,
});