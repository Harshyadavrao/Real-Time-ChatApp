import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getMessage, sendMessage } from "../controllers/message_controllers.js"

const messageRouter = express.Router()

messageRouter.post("/send/:receiver", isAuth, sendMessage)
messageRouter.get("/get/:receiver", isAuth, getMessage)

export default messageRouter