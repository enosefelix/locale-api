const { signup, login } = require('../controller/auth.controller');
const express = require('express')
const authRouter = express.Router()
const {validateRequiredFields} = require('../middleware/required-fields')

authRouter.post('/signup', validateRequiredFields(['email', 'password', 'first_name', 'last_name', 'retype_password']), signup)

authRouter.post('/login', validateRequiredFields(['email', 'password', 'API_key']), login)

module.exports = authRouter;