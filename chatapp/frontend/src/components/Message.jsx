import React, { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { GrEmoji } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice";
import { useEffect } from "react";

function Message(){
    let {selectedUser,userData, socket}= useSelector(state=>state.user)
    let dispatch = useDispatch()
    let [showPicker, setShowPicker] = useState(false)
    let [input, setInput] = useState("")
    let {messages} = useSelector(state=>state.message)

    const messageContainerRef = useRef();

  // Optional: Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

    const backtohome = async () =>{
        dispatch(setSelectedUser(null))
    }

    const onEmojiClick = (emojiData) => {
        setInput(prevInput=>prevInput+emojiData.emoji)
    }

    const handleSendMessage = async (e) => {
        if(input.length==0){
            return
        }
        e.preventDefault()
        try {
            let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,
                {message:input},
                {withCredentials:true})

            dispatch(setMessages([...messages,result.data]))
            console.log("Hiii")
            setInput("")
        } catch (error) {
            console.log(`${error}`)
        }
    }

    useEffect(()=>{
        socket?.on("newMessage", (mess) => {
            dispatch(setMessages([...messages, mess]))
        })
        return ()=>socket.off("newMessage")
    },[messages, setMessages])

    return(
        <div className={`lg:w-[70%] relative ${selectedUser?"flex":"hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300 overflow-hidden`}>
            {selectedUser &&
            <div className="w-full h-[100vh] flex flex-col overflow-hidden gap-[20px] items-center">
            <div className="w-full h-[100px] bg-[#118f11] rounded-b-[30px]  shadow-gray-400 shadow-lg flex items-center gap-[20px] px-[20px] py-[20px">
                <div className=" cursor-pointer" onClick={backtohome}><IoIosArrowBack className="w-[50px] h-[50px] text-white"/></div>
                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg'>
                    <img src={dp} alt="" className='h-[100%]'/>
                </div>
                <h1 className="text-white font-semibold text-[20px]">{selectedUser?.name || "User"}</h1>
            </div>
            <div ref={messageContainerRef} className="w-full h-[70%] flex flex-col py-[30px] px-[20px] gap-[20px] overflow-y-auto relative">
                {showPicker && (
                    <div className="absolute bottom-[120px] left-[20px] z-[100]">
                        <EmojiPicker width={250} height={350} onEmojiClick={onEmojiClick} />
                    </div>
            )}

            {messages &&
                messages.map((mess, index) => mess.sender === userData._id ? <SenderMessage message={mess.message} /> : <ReceiverMessage message={mess.message} />)}
            </div>
            </div>
            }

            {!selectedUser && 
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-[#118f11] font-bold text-[50px]">Welcome to Talksy</h1>
                    <span className="font-semibold text-[30px]">Chat Friendly</span>
                </div>}

            {selectedUser && 
                <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex justify-center items-center">
                <form className="w-[95%] lg:w-[70%] h-[60px] shadow-gray-400 shadow-lg rounded-full bg-[#118f11] flex gap-[20px] items-center px-[20px] relative" onSubmit={handleSendMessage}>
                    <div onClick={()=> setShowPicker(prev=>!prev)}>
                        <GrEmoji className="w-[25px] h-[25px] text-white cursor-pointer"/>
                    </div>
                    <input type="text" name="" id="" placeholder="Message" className="w-full h-full px-[10px] bg-transparent placeholder-white outline-none border-0 text-[19px] text-white" onChange={(e)=>setInput(e.target.value)} value={input}/>
                    {input.length>0 && 
                        <button>
                            <IoSendSharp className="w-[25px] h-[25px] text-white cursor-pointer"/>
                        </button>
                    }
                </form>
            </div>}
            
        </div>
    )
}

export default Message