import { Db } from "mongodb"
import connectDB from "../models/_db.js"
import {User} from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export default async function handler(req, res) {
    if (req.method!=="POST"){
        return res.status(405).json({message: "Method not allowed"})
    }

    const {email, password} = req.body

    if (!email) {return res.status(400).json({ error: "Email required" })}
    if (!password) {return res.status(400).json({ error: "Password required" })}

    await connectDB()

    const user = await User.findOne({email: email})

    if (!user) {
        return res.status(404).json({error: "Email does not exist"})
    }
    console.log(user)
    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        return res.status(404).json({error: "Invalid Credentials"})
    }
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)

    res.status(200).json({user, token})

}