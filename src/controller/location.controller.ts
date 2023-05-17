import { Request, Response } from "express";
import { locationModel } from "../models/location.model";
import { getOrSetCache } from "../logic/get-or-set-cache";

async function findAll(req: Request, res: Response): Promise<void> {
    const locations = await locationModel.find();
    res.send(locations);
}

async function getRegions(req: Request, res: Response) {
    const region_name = req.query.region_name as string;

    let regex = new RegExp(region_name, 'i');

    let fields = 'state region capital slogan population dialect borders past_governors lgas';

    try {
        const regions = await getOrSetCache(`region?region_name=${region_name}`, async () => {
            const region = await locationModel.find({ "region": regex }, fields);
            return region;
        });

        res.json({
            regions
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}


async function getState(req: Request, res: Response) {
    const state_name = req.query.state_name as string;
    console.log("🚀 ~ file: location.controller.ts:36 ~ getState ~ state_name:", state_name)
    const lga = req.query.lga as string;
    console.log("🚀 ~ file: location.controller.ts:38 ~ getState ~ lga:", lga)

    let regex = new RegExp(state_name, 'i');

    let state_fields = 'state capital'

    let fields = 'state region capital slogan population dialect borders past_governors'


    if (lga === 'true') {
        fields += ' lgas';
    }

    try {
        if ((!state_name && !lga)) {
            var states = await getOrSetCache(`state`, async () => {
                const state = await locationModel.find({}, state_fields);
                return state;
            });
        }
        var states = await getOrSetCache(`/state?state_name=${state_name}?lga=${lga}`, async () => {
            const state = await locationModel.find({ "state": regex }, fields);
            return state;
        });

        res.json({
            states
        });

    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function getLocalGvt(req: Request, res: Response) {
    const lga_name = req.query.lga_name as string;

    let regex = new RegExp(lga_name, 'i');
    console.log(regex)

    let fields = 'state region capital lgas'

    try {
        const lgas = await getOrSetCache(`lga?lga_name=${lga_name}`, async () => {
            const lga = await locationModel.find({ "lgas": regex }, fields);
            return lga;
        });

        res.json({
            lgas
        });

    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

export { findAll, getRegions, getState, getLocalGvt }