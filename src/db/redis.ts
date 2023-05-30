import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@node-redis/client';
const REDIS_URL = process.env.REDIS_URL;

const client = createClient({
    url: REDIS_URL,
    socket: {
        connectTimeout: 50000,
    },
});

client.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Failed to connect to Redis', err));

export default client;