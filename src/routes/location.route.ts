import { getRegions, getState, getLocalGvt, getAll } from "../controller/location.controller";
import express from 'express';
import { authMiddleware } from "../middleware/authHeaderMiddleware";
const locationRouter = express.Router()

locationRouter.get('/region', authMiddleware, getRegions);

locationRouter.get('/state', authMiddleware, getState);

locationRouter.get('/lga', authMiddleware, getLocalGvt);

locationRouter.get('/', authMiddleware, getAll);

export = locationRouter;