import { getRegions, getState, getLocalGvt } from "../controller/location.controller";
import express from 'express';
import { authMiddleware } from "../middleware/authMiddleware";
const locationRouter = express.Router()

locationRouter.get('/region', authMiddleware, getRegions);

locationRouter.get('/state', authMiddleware, getState);

locationRouter.get('/lga', authMiddleware, getLocalGvt);

export = locationRouter;