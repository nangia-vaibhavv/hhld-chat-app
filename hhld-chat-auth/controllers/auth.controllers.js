import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'


async function signup(req, res) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const checkIfUserExist = await userModel.findOne({username});
        if(checkIfUserExist) {
            res.status(400).json("user already exist.");
        }
        const user = new userModel({username, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "user created success"});

    } catch(err) {
        console.log("error occured while doing signup", JSON.stringify(err));
    }
}

export default signup;