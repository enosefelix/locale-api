const { userModel } = require('../models/auth.model');
const { generateRandomString } = require('../logic/api-logic')
const bcrypt = require('bcrypt');
const { apiKeyModel } = require('../models/api-keys.model')

async function signup(req, res) {
    const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
    const { email, password, first_name, last_name, retype_password } = req.body;

    if (regex.test(email)) {
        const foundUser = await userModel.findOne({ email });

        const API_key = generateRandomString(32)

        if (password !== retype_password) {
            res.send("Passwords do not match")
            return;
        }
        if (foundUser) {
            res.send("User already exists, try logging in")
            return;
        }

        const apiKey = await apiKeyModel.create({ API_key })
        const key = await apiKey.save();

        const user = await userModel.create({
            email,
            password,
            first_name,
            last_name,
            retype_password,
            API_key_id: key._id
        })
        const savedUser = await user.save()

        key.user = savedUser._id;
        await key.save();

        return res.json({
            message: "Signup successful. Welcome",
            user: {
                email,
                first_name,
                last_name
            },
            API_KEY: {
                notice: "Please ensure that you write down this API_key, it is a view once, and cannot be retrieved, retrieving is $200. View API key below",
                API_key
            }
        })
    } else {
        res.send("Please enter a valid");
    }
}

async function login(req, res) {
    const { email, password, API_key } = req.body;
    const user = await userModel.findOne({ email }).populate('API_key_id');

    if (!user) {
        res.send("User doesn't exist, Signup");
        return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.send('Invalid credentials');
        return;
    }
    if (API_key !== user.API_key_id.API_key) {
        res.send("Invalid API key, please check and try again");
        return;
    }
    res.send(`login successful`);
}

module.exports = { signup, login }