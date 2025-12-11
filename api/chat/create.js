import connectDB from "../models/_db.js";
import auth from "../auth/_auth.js";
import { Chat } from "../models/Chat.js";

export default async function handler(req, res) {
    if (req.method!=="POST") {
        return res.status(405).end()
    }

    const user = await auth(req, res)

    if (!user) {
        return res.status(404).json({message: "User is not authenticated"}) 
    }
    try {
        await connectDB()

        let {userId} = req.body;

        if (!userId) {
            return res.status(404).json({message: "User Id is required"})
        }

        let chat = await Chat.findOne({
            isGroup: false,
            "members.userId": {$all: [user._id, userId]}   
        })

        if (!chat) {
            chat = await Chat.create({
                isGroup: false,
                members: [
                    {userId: user._id},
                    {userId: userId}
                ]
            })
        }
        return res.json(chat)

    } catch(error) {
        return res.status(500).json({message: "Internal Server Error", error: error})

    }
}