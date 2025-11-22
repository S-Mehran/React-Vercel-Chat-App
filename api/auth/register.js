import connectDB from "../_db"
import User from "../models/User"
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
    if (req.method==="POST") {
        res.send(405).json({message: "Method not allowed"})
    }

    const {name, email, password} = req.body

    if (!name) {return res.status(400).json({ error: "Name required" })}
    if (!email) {return res.status(400).json({ error: "Email required" })}
    if (!password) {return res.status(400).json({ error: "Password required" })}

    await connectDB()

    const exists = await User.findOne({email})

    if (exists) {
        return res.status(400).json({error: "User Exists"})
    }

    const newUser = new User({
        name: name,
        email: email,
        password: password,
    })

    if (!newUser) {
        return res.status(400).json({error: " Exists"})

    }

    newUser.save()
    const token = jwt.sign(newUser, "nrakjwnrqwneqw")

    res.send(201).json({newUser, token})
}