import connectDB from "../models/_db.js";
import {User} from "../models/User.js";
import jwt from "jsonwebtoken";

export default async function auth(req, res) {
  const header = req.headers.authorization;
  if (!header) {
    //res.status(401).json({ message: "Missing token" });
    return null;
  }
    console.log('Auth1')
    await connectDB();
    const token = header.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth2')
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return null
      //return res.status(401).json({ message: "User not found" });
    }
console.log('Auth3')
    return user;
  
}