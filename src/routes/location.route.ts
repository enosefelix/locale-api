import { findAll, getRegions, getState, getLocalGvt } from "../controller/location.controller";
import express from 'express';
import { validateRequiredFields } from "../middleware/required-fields";
const locationRouter = express.Router()

locationRouter.get('/', findAll);

locationRouter.get('/region', validateRequiredFields(["api_key"]), getRegions);

locationRouter.get('/state', validateRequiredFields(["api_key"]) , getState);

locationRouter.get('/lga', validateRequiredFields(["api_key"]) , getLocalGvt);

export = locationRouter;