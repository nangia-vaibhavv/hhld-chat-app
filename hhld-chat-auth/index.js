import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/users.routes.js'
import connectToMongoose from './db/connectMongo.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000","http://localhost:3001"]
}))
app.use(cookieParser());
app.use('/auth', authRouter)
app.use('/users', userRouter)

dotenv.config(); 

const PORT = process.env.PORT || 3000;

connectToMongoose()
app.listen((PORT), ()=> {
    console.log("server is up and running on port",PORT)
})