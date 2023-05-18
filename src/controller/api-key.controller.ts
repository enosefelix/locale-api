import { Request, Response } from "express";

import { apiKeyModel } from '../models/api-keys.model';

export async function verify(req:Request, res: Response): Promise<void | undefined>{
    const {api_key} = req.body;
    const apiKey = await apiKeyModel.findOne({ API_key: api_key })
    if (!apiKey) {
        res.send("Invalid api key, check and try again")
        return;
    }
    res.send("You have a valid API key")
    return;
}