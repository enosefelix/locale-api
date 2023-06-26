import { NextFunction, Request, Response } from "express";
import { apiKeyModel } from "../models/api-keys.model";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Missing Authorization header');
    }

    try {
        const key = async () => {
            const key = await apiKeyModel.findOne({ "API_key": authHeader });
            if (key === null) {
                throw new Error('Invalid API_key');
            }
            return key;
        };
        next();
    } catch (error) {
        res.status(401).send('Invalid API Key');
    }
}

