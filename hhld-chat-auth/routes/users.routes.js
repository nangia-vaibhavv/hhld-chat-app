import express from 'express'
import { getUsers } from '../controllers/users.controllers.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router();

router.get('/', verifyToken, getUsers);

export default router;

//req
//middleware : access to req, resp, next func