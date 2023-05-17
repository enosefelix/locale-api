import { userModel } from '../models/auth.model';
import { generateRandomString } from '../logic/api-logic';
import * as bcrypt from 'bcrypt';
import { apiKeyModel } from '../models/api-keys.model';
import { Request, Response } from 'express';

async function signup(req: Request, res: Response): Promise<void | string> {
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

        const apiKey = await apiKeyModel.create({ API_key, createdAt: Date.now() })
        const key = await apiKey.save();

        const user = await userModel.create({
            email,
            password,
            first_name,
            last_name,
            retype_password,
            API_key_id: key._id,
            createdAt: Date.now()
        })
        const savedUser = await user.save()

        key.user = savedUser._id;
        key.createdBy = `${first_name} ${last_name}`;
        await key.save();

        res.json({
            message: "Signup successful. Welcome",
            user: {
                email,
                first_name,
                last_name
            },
            notice: "Please ensure that you write down this API_key, it is a view once, and cannot be retrieved, retrieving is $200. View API key below: ",
            API_key
        })
        return;
    } else {
        res.send("Please enter a valid");
    }
}

async function login(req: Request, res: Response): Promise<void> {
    const { email, password, API_key } = req.body;
    const user = await userModel.findOne({ email })
        .populate({
            path: 'API_key_id',
            select: 'API_key',
        });

    if (!user) {
        res.send("User doesn't exist, Signup");
        return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.send('Invalid credentials');
        return;
    }

    const user_apikey = (user.API_key_id as unknown as { API_key: string }).API_key;

    if (API_key !== user_apikey) {
        res.send("Invalid API key, please check and try again");
        return;
    }
    res.send(`login successful`);
}

export { signup, login }