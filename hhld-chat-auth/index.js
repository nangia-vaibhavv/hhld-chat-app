import express from 'express'
import dotenv from 'dotenv'
import router from './routes/auth.routes.js'
import connectToMongoose from './db/connectMongo.js'
const app = express()
app.use(express.json())
app.use('/auth', router)
dotenv.config();

const PORT = process.env.PORT || 3000;

connectToMongoose()
app.listen((PORT), ()=> {
    console.log("server is up and running on port",PORT)
})