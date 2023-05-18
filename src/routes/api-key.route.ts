import { verify } from '../controller/api-key.controller';
import express from 'express';
const apiRouter = express.Router();

apiRouter.get('/', verify)

export = apiRouter