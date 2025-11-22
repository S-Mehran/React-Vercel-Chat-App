import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  
}, {
    timestamps: true
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)