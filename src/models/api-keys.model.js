const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
    API_key:
    {
        type: String,
        required: false
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const apiKeyModel = mongoose.model('apiKeys', apiKeySchema);

module.exports = { apiKeyModel }
