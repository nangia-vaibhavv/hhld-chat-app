import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
const mongoUrl = process.env.MONGO_DB_URI;


const connectToMongoose = async() => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("connected!")
    } catch(err) {
        console.log("connecting to mongodb failed", JSON.stringify(err));
    }
}

export default connectToMongoose;