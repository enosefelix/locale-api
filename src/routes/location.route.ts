import { findAll, getRegions, getState, getLocalGvt } from "../controller/location.controller";
import express from 'express';
const locationRouter = express.Router()

locationRouter.get('/', findAll);

locationRouter.get('/region', getRegions);

locationRouter.get('/state', getState);

locationRouter.get('/lga', getLocalGvt);

export = locationRouter;