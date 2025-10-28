import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const gentoken=async (userId)=>{
    try {
        const token=await jwt.sign({userId},process.env.JWT_SEXRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("gen token error")

    }
}

export default gentoken