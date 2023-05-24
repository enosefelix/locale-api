import { verify, signup } from '../controller/auth.controller';
import express from 'express';
const authRouter = express.Router()
import { validateRequiredFields } from '../middleware/required-fields';


/**
 * @swagger
 * /auth/signup:
 *  post:
 *    description: Create user
 *    parameters:
 *    - name: user
 *      description: User object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/User'
 *    responses:
 *      200:
 *        description: Success
 * 
 */
authRouter.post('/signup', validateRequiredFields(['email', 'password', 'first_name', 'last_name', 'retype_password']), signup)

authRouter.post('/verify', validateRequiredFields(['API_key']), verify)

export = authRouter;