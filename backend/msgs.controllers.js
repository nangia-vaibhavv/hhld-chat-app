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