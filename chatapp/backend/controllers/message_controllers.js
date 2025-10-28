import { response } from "express"
import Conversation from "../models/consversation_model.js"
import Message from "../models/message_model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendMessage = async (req, res) => {
    try {
        let sender=req.userId
        let {receiver}=req.params
        let {message} = req.body

        let conversation = await Conversation.findOne({
            participants:{$all:[sender, receiver]}
        })

        let newmessage = await Message.create({
            sender, receiver, message
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[sender, receiver],
                messages:[newmessage._id]
            })
        }else{
            conversation.messages.push(newmessage._id)
            await conversation.save()
        }

        const receiverSocketId = getReceiverSocketId(receiver)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newmessage)
        }

        return res.status(201).json(newmessage)

    } catch (error) {
        return res.status(500).json({message:`send message error ${error}`})
    }
}


export const getMessage=async (req,res)=>{
    try {
        let sender=req.userId
        let {receiver}=req.params
        let conversation = await Conversation.findOne({
            participants:{$all:[sender, receiver]}
        }).populate("messages")

        return res.status(200).json(conversation?.messages || []);

    } catch (error) {
        return res.status(500).json({message:`get Message error ${error}`})
    }
}