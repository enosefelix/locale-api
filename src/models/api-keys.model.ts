import mongoose from 'mongoose'
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

export const apiKeyModel = mongoose.model('apiKeys', apiKeySchema);