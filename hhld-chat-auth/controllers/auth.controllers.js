import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js"
import bcrypt from 'bcrypt'


export async function signup(req, res) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const checkIfUserExist = await userModel.findOne({username});
        if(checkIfUserExist) {
            res.status(400).json({message: "user already exist"});
        }
        const user = new userModel({username, password: hashedPassword});
        generateToken(user._id, res);
        await user.save();
        res.status(201).json({message: "user created success"});

    } catch(err) {
        console.log("error occured while doing signup", JSON.stringify(err));
        throw err;
    }
}

export async function login(req, res) {
    try {
        const { username, password} = req.body;
        const checkIfUserExist = await userModel.findOne({username});
        if(!checkIfUserExist) {
            res.status(401).json({message: "invalid creds"});
        }
        const passwordMatch = await bcrypt.compare(password, checkIfUserExist?.password);
        if(!passwordMatch) {
            res.status(401).json({message: "invalid creds"});
        } 
        generateToken(checkIfUserExist?._id, res);
        res.status(200).json({message: "login success", _id: checkIfUserExist?._id, username: checkIfUserExist?.username});
    } catch(err) {
        console.log("error occured while doing login", JSON.stringify(err));
        throw err;
    }
}
