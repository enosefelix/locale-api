import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();
const REDIS_URL = process.env.REDIS_URL;

function getRedisUrl(): any {
    if (REDIS_URL) {
        return REDIS_URL
    }
    throw new Error('Error while fetching redis url')
}

export const redisDb = new Redis(getRedisUrl())