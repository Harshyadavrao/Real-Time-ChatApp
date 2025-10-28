import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

function SenderMessage({message}){
    // let scroll = useRef()
    // useEffect(()=>{
    //         scroll.current.scrollIntoView({behavior:"smooth"})
    //     }, [message])
    return(
        <div className="w-fit h-fit max-w-[500px] px-[20px] py-[5px] bg-[#118f11] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg" >
           {message && <span>{message}</span>} 
        </div>
    )
}

export default SenderMessage