import { Request, Response } from "express";
import express from 'express'
import { connectMongoDB } from './src/db/db'
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000 as number;
import authRouter from './src/routes/auth.route'
import apiRouter from './src/routes/api-key.route'
import locationRouter from './src/routes/location.route';
import { rateLimiter } from './src//middleware/rate-limiter';

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(rateLimiter);


app.use('/auth', authRouter)
app.use('/verify', apiRouter)
app.use('/location', locationRouter)

app.get('/', (req: Request, res: Response): void => {
    res.send('Welcome to the blogging api')
})

connectMongoDB()

app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`)
})

