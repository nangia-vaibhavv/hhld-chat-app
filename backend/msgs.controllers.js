import Conversation from "./models/chat.models.js";

export const addMsgConversation = async (participants, msg) => {
    try {
        const conversation = await Conversation.findOne({
            users: { $all: participants }
        })
        if(!conversation) {
            conversation = await Conversation.create({users: participants})
        }
        conversation.msgs.push(msg);
        await conversation.save();
    } catch(err) {
        console.log(`error occured while sending message`, err)
    }
}

export const getMsgsForConversation = async (req, res) => {
    try {
        const { sender, receiver } = req.query;
        const participants = [sender, receiver];
        const conversation = await Conversation.findOne({users: { $all: participants}});
        if(!conversation) {
            console.log("no conversation found");
        }
        return res.json(conversation.msgs);
    } catch(err) {
        console.log("error occured while fetching messages", err)
    }
}