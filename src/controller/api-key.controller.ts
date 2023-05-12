import { Request, Response } from "express";

const { apiKeyModel } = require('../models/api-keys.model');

export async function verify(req:Request, res: Response): Promise<void | undefined>{
    const apikey = req.params.apikey;
    const api_key = await apiKeyModel.findOne({ API_key: apikey })
    if (!api_key) {
        res.send("Invalid api key, check and try again")
        return;
    }
    res.send("You have a valid API key")
    return;
}