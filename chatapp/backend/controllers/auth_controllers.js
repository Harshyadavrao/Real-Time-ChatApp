import gentoken from "../config/token.js"
import User from "../models/user_model.js"
import bcrypt from "bcryptjs" // this is for to hash(adding something in password for security) the password 

export const signUp = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const checkuserbyusername = await User.findOne({username})
        if(checkuserbyusername){
            return res.status(400).json({message: "username allready exist"})
        }

        const checkuserbyemail = await User.findOne({email})
        if(checkuserbyemail){
            return res.status(400).json({message: "email allready exist"})
        }

        if(password.length<6){
            return res.status(400).json({message: "password must be at least 6 characters"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username: username, email: email, password:hashedPassword
        })

        const token=await gentoken(user._id)
 
         res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:false
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:`signup error ${error}`})
    }
}

export const login=async (req,res)=>{
    try {
     const {email,password}=req.body
     const user=await User.findOne({email})
     if(!user){
         return res.status(400).json({message:"user does not exist"})
     }

 const isMatch=await bcrypt.compare(password,user.password)
 if(!isMatch){
    return res.status(400).json({message:"incorrect password"})
 }
 
 const token=await gentoken(user._id)
 
 res.cookie("token",token,{
     httpOnly:true,
     maxAge:7*24*60*60*1000,
     sameSite:"Strict",
     secure:false
    })
 
    return res.status(200).json(user)
 
 
    } catch (error) {
     return res.status(500).json({message:`login error ${error}`})
    } 
 }

export const logout = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "log out successfully"})
    } catch (error) {
        return res.status(500).json({message: `logout error ${error}`})
    }
}