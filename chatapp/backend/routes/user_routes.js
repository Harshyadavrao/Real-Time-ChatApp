import express from "express"
import { editprofile, getCurrentUser, getOtherUsers, search } from "../controllers/user_controllers.js"
import isAuth from "../middleware/isAuth.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.put("/profile", isAuth, editprofile)
userRouter.get("/others", isAuth, getOtherUsers)
userRouter.get("/serach", isAuth, search)

export default userRouter