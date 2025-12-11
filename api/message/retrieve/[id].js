import connectDB from "../../models/_db.js";
import auth from "../../auth/_auth.js";
import { Message } from "../../models/Message.js";


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
        
        const {id} = req.query
        
        if (!id) {
            return res.status(400).json({message: "Request parameter not provided"})
        }
        console.log("list2", id)

        let messages = await Message.find({
            chatId: id,
        })

        console.log("list3", messages)


        if (messages.length===0) {
            return res.status(200).json({message: "No conversation found. Send a message"})
        }
        
        return res.status(200).json({messages})
    } catch(e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e
        })
    }
}