import connectDB from "../models/_db.js";
import auth from "../auth/_auth.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

export default async function handler(req, res) {
    if (req.method!=="POST") {
        return res.status(405).json({message: "Method not allowed"})
    }

    const user = await auth(req, res);
    if (!user) {
        return res.status(404).json({message: "User not authenticated"})
    }

    try{
        await connectDB()

        const {chatId, senderId, text} = req.body

        if (!chatId || !senderId || !text) {
            return res.status(400).json({message: "Missing details in request"})
        }

        const chat = await Chat.findOne({
            _id: chatId
        })

        if (!chat) {
            return res.status(404).json({message: "Chat not found"})
        }

        const userFound = await User.findOne({
                    _id: senderId,
        })



        if (!userFound) {
            return res.status(404).json({message: "User not found"})
        }



        let newMsg = await Message.create({
            chatId: chatId,
            senderId: senderId,
            text: text,
        })

        if (!newMsg) {
            return res.status(400).json({message: "Failed to create new message"})
        }

        return res.status(201).json({newMsg})

    }catch(e) {
        return res.status(500).json({message: "Server Error", error: e})
    }
}