import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 25,
    message: `You have exceeded 25 request limit, limit will expire in 3hrs`,
    standardHeaders: true,
    legacyHeaders: false,
});