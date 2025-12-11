import mongoose from "mongoose"


const MessageSchema = new mongoose.Schema({
    chatId: {type: mongoose.Schema.Types.ObjectId, ref: "Chat", index: true},
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    text: String,
    readBy: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId},
            readAt: Date,
        },
    ],


},
    {timestamps:true}  

)

MessageSchema.index({"chatId": 1, createdAt: -1})
//-1 for reverse indexing. So, last messages are retrieved first

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)