import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        userId
      }, process.env.JWT_SECRET);

      res.cookie("jwt", token, {
        httpOnly: true, 
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
      })
}

export default generateToken;