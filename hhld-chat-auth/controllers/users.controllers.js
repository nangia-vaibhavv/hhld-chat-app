import userModel from "../models/user.model.js";

export async function getUsers(req, res) {
    try{
        const userList = await userModel.find({}, 'username');
        res.status(200).json({userList})
    } catch(err) {
        console.log("error while fetching users",err);
        throw err
    }
}