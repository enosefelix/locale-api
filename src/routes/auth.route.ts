import { signup, login } from '../controller/auth.controller';
import express from 'express';
const authRouter = express.Router()
import { validateRequiredFields } from '../middleware/required-fields';

authRouter.post('/signup', validateRequiredFields(['email', 'password', 'first_name', 'last_name', 'retype_password']), signup)

authRouter.post('/login', validateRequiredFields(['email', 'password', 'API_key']), login)

export = authRouter;