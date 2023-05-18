import { getRegions, getState, getLocalGvt } from "../controller/location.controller";
import express from 'express';
import { validateRequiredFields } from "../middleware/required-fields";
const locationRouter = express.Router()

locationRouter.get('/region', getRegions);

locationRouter.get('/state', getState);

locationRouter.get('/lga', getLocalGvt);

export = locationRouter;