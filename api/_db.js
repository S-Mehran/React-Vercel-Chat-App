import mongoose from "mongoose"

const g = typeof global !== "undefined" ? global: globalThis;

let cached = g.mongoose

if (!cached) {
    cached = g.mongoose = {conn: null, promise: null};
}

export default async function connectDB() {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI)
    }
}