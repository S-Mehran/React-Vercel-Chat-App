import mongoose from "mongoose"


const ChatSchema = new mongoose.Schema({
    isGroup: {type: Boolean, default: false},
    name: {type: String, required: false},
    avatar: {type: String, required: false},
    members: [
        {
            _id: false,
            userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            role: {type: String, default: "member"},
        },
    ],
    lastMessage: {
        messageId: {type: mongoose.Schema.Types.ObjectId, ref: "Message"},
        text: String,
        senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        createdAt: Date,
    },

},
    {timestamps:true}  

)

ChatSchema.index({"members.userId": 1})

export const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema)