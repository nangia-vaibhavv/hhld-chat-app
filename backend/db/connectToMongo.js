import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
const mongoUrl = process.env.MONGO_DB_URI


async function connectToMongo() {
    try {
        await mongoose.connect(mongoUrl);
        console.log("connected to chat db")
    } catch(err) {
        console.log('connection failed', err);
    }
}

export default connectToMongo;