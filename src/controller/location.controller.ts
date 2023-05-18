import { Request, Response } from "express";
import { locationModel } from "../models/location.model";
import { getOrSetCache } from "../logic/get-or-set-cache";
import { apiKeyModel } from '../models/api-keys.model';
async function findAll(req: Request, res: Response): Promise<void> {
    const locations = await locationModel.find();
    res.send(locations);
}

async function getRegions(req: Request, res: Response) {
    const { api_key } = req.body;
    const region_name = req.query.region_name as string;
    const lga = req.query.lga as string;

    let regex = new RegExp(region_name, 'i');
    let fields = 'state region capital slogan population dialect';



    try {
        const key = await getOrSetCache(`api_key_${api_key}`, async () => {
            const key = await apiKeyModel.findOne({ "API_key": api_key });
            if (key === null) {
                throw new Error('Invalid API_key');
            }
            return key;
        });


        if (lga === 'true') {
            fields += ' lgas';
        }

        const regions = await getOrSetCache(`region?region_name=${region_name}?lga=${lga}`, async () => {
            const region = await locationModel.find({ "region": regex }, fields);
            return region;
        });

        res.json({ regions });

    } catch (error: any) {
        res.status(401).json({ error: error.message });
        return;
    }
}



async function getState(req: Request, res: Response) {
    const { api_key } = req.body;
    const state_name = req.query.state_name as string;
    const lga = req.query.lga as string;

    let regex = new RegExp(state_name, 'i');

    let fields = 'state region capital slogan population dialect';

    try {
        const key = await getOrSetCache(`api_key_${api_key}`, async () => {
            const key = await apiKeyModel.findOne({ "API_key": api_key });
            if (key === null) {
                throw new Error('Invalid API_key');
            }
            return key;
        });

        if (lga === 'true') {
            fields += ' lgas';
        }

        let states;
        if ((!state_name && !lga)) {
            states = await getOrSetCache(`state_${api_key}`, async () => {
                const state = await locationModel.find({}, fields);
                return state;
            });
        } else {
            states = await getOrSetCache(`state_${api_key}_state_name=${state_name}_lga=${lga}`, async () => {
                const state = await locationModel.find({ "state": regex }, fields);
                return state;
            });
        }

        res.json({
            states
        });

    } catch (error: any) {
        res.status(401).json({ error: error.message });
        return;
    }
}

async function getLocalGvt(req: Request, res: Response) {
    const { api_key } = req.body;
    const lga_name = req.query.lga_name as string;

    let regex = new RegExp(lga_name, 'i');

    let fields = 'state region capital lgas slogan population dialect';

    try {
        const key = await getOrSetCache(`api_key_${api_key}`, async () => {
            const key = await apiKeyModel.findOne({ "API_key": api_key });
            if (key === null) {
                throw new Error('Invalid API_key');
            }
            return key;
        });

        const lgas = await getOrSetCache(`lga_${api_key}_lga_name=${lga_name}`, async () => {
            const lga = await locationModel.find({ "lgas": regex }, fields);
            return lga;
        });

        res.json({
            lgas
        });

    } catch (error: any) {
        res.status(401).json({ error: error.message });
        return;
    }
}

export { findAll, getRegions, getState, getLocalGvt }