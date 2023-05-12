import mongoose from'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL as string;

function connectMongoDB(): void {
    mongoose.connect(MONGO_URL)
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB Successfully');
    })
    mongoose.connection.on('error', (e) => {
        console.log('An error occured while connecting to MongoDB');
        console.log(e);
    })
}

export { connectMongoDB }