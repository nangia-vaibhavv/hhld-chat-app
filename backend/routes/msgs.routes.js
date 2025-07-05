import express from 'express'
import { addMsgConversation, getMsgsForConversation } from '../controllers/msgs.controllers.js';
const router = express.Router();
router.get('/', getMsgsForConversation);
router.post('/', addMsgConversation);

export default router;