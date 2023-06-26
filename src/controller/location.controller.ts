import { Response, Request } from "express";
import { locationModel } from "../models/location.model";
import { getOrSetCache } from "../logic/get-or-set-cache";
import { InvalidQueryError } from "../enums/enums";

async function getAll(req: Request, res: Response) {
    let skip;
    const stateSort = req.query.state_sort as string;
    const populationSort = req.query.population_sort as string;
    let fields = 'state region capital slogan population dialect longitude latitude landmass senatorial_districts created_date known_for borders lgas';
    const page = Number(req.query.page) * 1 || 1;
    const limit = Number(req.query.limit) * 1 || 20;
    skip = (page - 1) * limit;
    let sortQuery: any = {};

    if (stateSort === "desc") {
        sortQuery.state = -1;
    } else if (stateSort === "asc") {
        sortQuery.state = 1;
    } else if (populationSort === "desc") {
        sortQuery.population = -1;
    } else if (populationSort === "asc") {
        sortQuery.population = 1;
    }

    const minPopulation = Number(req.query.minPopulation);
    const maxPopulation = Number(req.query.maxPopulation);

    let findQuery: any = {};

    if (minPopulation || maxPopulation) {
        findQuery.population = {};
    }

    if (minPopulation) {
        findQuery.population.$gt = minPopulation;
    }

    if (maxPopulation) {
        findQuery.population.$lt = maxPopulation - 1000000;
    }

    const locations = await locationModel.find(findQuery, fields).sort(sortQuery).skip(skip).limit(limit);
    res.send(locations)
}

async function getRegions(req: Request, res: Response) {
    const region_name = req.query.region_name as string;
    const lgas = req.query.lga as string;
    let fields = 'state region capital slogan population dialect longitude latitude landmass senatorial_districts created_date known_for borders';

    try {
        if (lgas === 'true') {
            fields += ' lgas';
        }

        let regions: any;
        if (!region_name && !lgas) {
            res.status(401).send(InvalidQueryError.REGION_ERROR);
            return;
        }  else {
            regions = await getOrSetCache(
                `region?region_name=${region_name}?lga=${lgas}`,
                async () => {
                    const splitName = region_name.split(', ');
                    console.log("🚀 ~ file: location.controller.ts:71 ~ splitName:", splitName)

                    const mapped: any = splitName.map((region: string) => {
                        let regex = new RegExp(region, 'i');
                        return { region: regex };
                    });
                    console.log("🚀 ~ file: location.controller.ts:76 ~ constmapped:any=splitName.map ~ mapped:", mapped)

                    const region = await locationModel.find({ $or: mapped }, fields);

                    return region;
                }
            );
        }

        if (regions) {
            res.status(200).json({ regions });
        }

    } catch (error: any) {
        if (error.message === 'Invalid API_key') {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
        return;
    }
}

async function getState(req: Request, res: Response) {
    try {
        const state_name = req.query.state_name as string;
        const lgas = req.query.lga as string;
        let fields = 'region state capital slogan population dialect longitude latitude landmass created_date senatorial_districts known_for borders';
        if (lgas === 'true') {
            fields += ' lgas';
        }

        let states: any;

        if (!state_name && !lgas) {
            res.status(401).send(InvalidQueryError.STATE_ERROR);
            return;
        } else if (!state_name && lgas) {
            states = await getOrSetCache(`state?lga=${lgas}`, async () => {
                const state = await locationModel.find({}, fields);
                return state;
            });
        } else {
            states = await getOrSetCache(
                `state?state_name=${state_name}?lga=${lgas}`,
                async () => {
                    const splitName = state_name.split(', ');
                    const mapped: any = splitName.map((state: string) => {
                        let regex = new RegExp(state, 'i');
                        return { state: regex };
                    });

                    const state = await locationModel.find({ $or: mapped }, fields);
                    const inputStates = splitName.length;
                    const foundStates = state.length;

                    if (foundStates < inputStates) {
                        const notFoundStates = inputStates - foundStates;
                        const errorMessage = `${notFoundStates} state(s) were not found in the database. Please check that you are inputting valid state names.`;

                        res.status(404).json({
                            "error": errorMessage,
                            state
                        });
                        return;
                    }
                    return state;
                }
            );
        }

        if (states) {
            res.status(200).json({ states });
        }
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}


async function getLocalGvt(req: Request, res: Response) {
    const lga_name = req.query.lga_name as string;

    let fields = 'state lgas region';
    let lgas;

    try {
        if (!lga_name) {
            res.status(401).send(InvalidQueryError.LGA_ERROR);
            return;
        }
        else {
            lgas = await getOrSetCache(`lga?lga_name=${lga_name}`, async () => {
                const splitName = lga_name.split(', ');
                const mapped: any = splitName.map((lga: string) => {
                    let regex = new RegExp(lga, 'i');
                    return { lgas: regex };
                });
                const lga = await locationModel.find({ $or: mapped }, fields);
                return lga;
            });
        }

        if ((lgas as any[]).length === 0) {
            res.status(404).json({ message: `"${lga_name}" Local Government not found. Please try again with valid Local Government name` });
            return;
        }

        res.status(200).json({
            lgas
        });

    } catch (error: any) {
        res.status(401).json({ error: error.message });
        return;
    }
}

export { getRegions, getState, getLocalGvt, getAll }