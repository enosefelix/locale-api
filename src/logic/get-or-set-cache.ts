import { redisDb } from '../db/redis';
const REDIS_EXPIRATION = process.env.REDIS_EXPIRATION as string;

function getOrSetCache(key: string, cb: any) {
    return new Promise((resolve, reject) => {
        redisDb.get(key, async (error, data: any) => {
            if (error) return reject(error);
            if (data === null) {
                const newData = await cb();
                redisDb.setex(key, REDIS_EXPIRATION, JSON.stringify(newData));
                console.log('new data')
                return resolve(newData);
            } else {
                console.log("cached")
                return reject(JSON.parse(data));
            }
        });
    });
}

export { getOrSetCache }
