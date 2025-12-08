import connectDB from "../_db.js"
import {User} from "../models/User.js"
import bcrypt from "bcrypt"

export default async function handler(req, res) {
    if (req.method!=="POST") {
        return res.status(405).json({message: "Method not allowed"})
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
    console.log(process.env.SALT_ROUNDS)
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });


    if (!newUser) {
        return res.status(400).json({error: "Error occured"})

    }

    newUser.save()

    res.status(201).json({newUser})
}