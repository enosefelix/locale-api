import client from '../db/redis';
import dotenv from 'dotenv';
dotenv.config();
const REDIS_EXPIRATION = process.env.REDIS_EXPIRATION as string;

async function getOrSetCache(key: string, cb: () => Promise<any>) {
    try {
        const data = await client.get(key);
        if (data) {
            console.log("Cached");
            return JSON.parse(data);
        }
    } catch (error) {
        console.error(`Error getting data from Redis for key ${key}: ${error}`);
    }

    try {
        const newData = await cb();
        await client.setEx(key, parseInt(REDIS_EXPIRATION), JSON.stringify(newData));
        console.log('New data');
        return newData;
    } catch (error) {
        console.error(`Error setting new data in Redis for key ${key}: ${error}`);
        throw error;
    }
}

export {getOrSetCache};
