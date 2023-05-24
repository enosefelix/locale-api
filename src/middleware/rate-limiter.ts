import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 30,
    message: `You have exceeded 25 request limit, limit will expire in 3hrs`,
    standardHeaders: false,
    legacyHeaders: false,
});