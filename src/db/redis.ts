import dotenv from 'dotenv';
dotenv.config();
import Redis from 'ioredis';
import { createClient } from 'redis';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT as number | undefined;
console.log("🚀 ~ file: redis.ts:8 ~ REDIS_PORT:", REDIS_PORT)

function getRedisUrl(): any {
const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});
}

export const redisDb = new Redis(getRedisUrl())