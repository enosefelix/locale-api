import mongoose from 'mongoose'
const Schema = mongoose.Schema;
import * as bcrypt from 'bcrypt';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    retype_password: {
        type: String,
        required: false
    },
    API_key_id: {
        type: Schema.Types.ObjectId,
        ref: 'apiKeys'
    },
    createdAt: {
        type: Date
    }
});

userSchema.pre(
    'save',
    async function (next) {
        if (!this.isModified('password')) return;
        const user = this;
        const hash = await bcrypt.hash(this.password, 6)
        this.password = hash
        this.retype_password = hash
        next()
    }
)

userSchema.methods.validPassword = async function (password: string): Promise<boolean> {
    const user = this;
    const compare = await bcrypt.compare(password, user.password)
    return compare
}


export const userModel = mongoose.model('users', userSchema);