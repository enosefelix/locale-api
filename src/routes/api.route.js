const { verify } = require('../controller/api.controller');
const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/verify/:apikey', verify)

module.exports = apiRouter