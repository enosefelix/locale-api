import { verify, signup } from '../controller/auth.controller';
import express from 'express';
const authRouter = express.Router()
import { validateRequiredFields } from '../middleware/required-fields';


authRouter.post('/signup', validateRequiredFields(['email', 'password', 'username', 'retype_password']), signup)

authRouter.post('/verify', validateRequiredFields(['API_key', 'email']), verify)

export = authRouter;