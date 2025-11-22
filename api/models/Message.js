import mongoose from "mongoose"


const ChatSchema = new mongoose.Schema({
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

ChatSchema.index({"chatId": 1, createAt: -1})
//-1 for reverse indexing. So, last messages are retrieved first

export const User = mongoose.models.User || mongoose.model('User', UserSchema)