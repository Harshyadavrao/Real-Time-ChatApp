import express from "express"
import dotenv from "dotenv" // for storing sensitive information that we doesnt want to show anyone
import connectDB from "./config/db.js"
import authRouter from "./routes/auth_routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user_routes.js"
import messageRouter from "./routes/message_routes.js"
import { app, server } from "./socket/socket.js"
dotenv.config()

const port = process.env.PORT || 5000 // this to get value from env file and if 8000 port is not availabe then run on 5000 port


app.use(cors ({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json()) // this is a middleware which is used whenever we want to take data from body
app.use(cookieParser())
app.use("/api/auth", authRouter) // this is for puutting /api/auth in fornt of any route created using authRouter
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)


server.listen(port, () => {
    connectDB()
    console.log("server started ")
})