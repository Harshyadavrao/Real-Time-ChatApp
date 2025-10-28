import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ Initial MongoDB connection error:", error.message);
    }
};

export default connectDB