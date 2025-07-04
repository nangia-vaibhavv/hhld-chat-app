import express from 'express'
import { getMsgsForConversation } from '../msgs.controllers.js';
const router = express.Router();
router.get('/', getMsgsForConversation);
export default router;