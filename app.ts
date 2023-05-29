import { Request, Response } from "express";
import express from 'express'
import { connectMongoDB } from './src/db/db'
const app = express()
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 3000 as number;
import authRouter from './src/routes/auth.route'
import locationRouter from './src/routes/location.route';
import { rateLimiter } from './src//middleware/rate-limiter';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from "./src/middleware/swagger-definitions";
const swaggerSpec = swaggerJSDoc(swaggerDefinition);


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', rateLimiter, authRouter)
app.use('/location', rateLimiter, locationRouter)

app.get('/', (req: Request, res: Response): void => {
    res.send('Welcome to the location api')
})

connectMongoDB()

app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`)
})

