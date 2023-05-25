import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@node-redis/client';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT as number | undefined;
console.log("🚀 ~ file: redis.ts:8 ~ REDIS_PORT:", REDIS_PORT)

const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});

client.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Failed to connect to Redis', err));

export default client;