import jwt from "jsonwebtoken"

export async function verifyToken(req, res, next) {
    try {
        const token = req?.cookies?.jwt;
        if(!token) {
            res.status(401).json({message: 'unauthorized token not provided'});
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(err) {
        console.log("error occured while verify token", err)
    }
}