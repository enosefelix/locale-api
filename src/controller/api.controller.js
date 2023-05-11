const { apiKeyModel } = require('../models/api-keys.model');

async function verify(req, res) {
    const apikey = req.params.apikey;
    const api_key = await apiKeyModel.findOne({ API_key: apikey })
    if (!api_key) {
        res.send("Invalid api key, check and try again")
        return;
    }
    res.send("You have a valid API key")

}

module.exports = { verify }