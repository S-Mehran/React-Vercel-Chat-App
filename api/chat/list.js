import connectDB from "../models/_db.js";
import { Chat } from "../models/Chat.js";
import auth from "../auth/_auth.js";

export default async function handler(req, res) {
    if (req.method!=="GET") {
        return res.status(405).end()
    }

    const user = await auth(req, res)
    if (!user) {
        return res.status(401).json({message: "User not authenticated"})
    }
    try{
        await connectDB();
        console.log("list1")
        let chats = await Chat.find({
            "members.userId": user._id,
        })
        console.log("list2", chats)

        chats = await Chat.populate(chats, [
            {path: "members.userId", select: "name email"},
            {path: "lastMessage.senderId", select: "name"},
        ])
        console.log('list3', chats)
        return res.status(200).json({chats})
    } catch(e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e
        })
    }
}