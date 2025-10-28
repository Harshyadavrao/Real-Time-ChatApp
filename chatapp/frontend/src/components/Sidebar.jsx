import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.webp"

function Sidebar(){
    let {userData, otherUsers,selectedUser, searchData} = useSelector(state=>state.user)
    let [serach, setSearch] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [input, setInput] = useState("")

    const handleSerachCross = ()=>{
        setInput("")
        dispatch(setSearch(false))
    }

    const handleLogOut = async ()=>{
        try {
            let result = axios.get(`${serverUrl}/api/auth/logout`, {withCredentials:true})
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            dispatch(setSelectedUser(null))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const handleserach = async ()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/user/serach?query=${input}`, {withCredentials:true})
            dispatch(setSearchData(result.data))
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(input){
            handleserach()
        }
    },[input])

    return(
        <div className={`lg:w-[30%] w-full h-full lg:block bg-slate-200 ${!selectedUser?"block":"hidden"} relative`}>
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg bg-[#5ed45e] text-gray-800 mt-[10px] absolute bottom-[22px] left-[20px] cursor-pointer" onClick={handleLogOut}>
                <RiLogoutBoxLine className="h-[20px] w-[20px]"/>
            </div>
            
            {input.length>0 && 
            <div className="flex w-full h-[300px] overflow-y-auto flex-col gap-[10px] absolute top-[300px] z-[150] items-center bg-[white]">
                {searchData?.map((user)=>(
                    <div className="w-[95%] flex justify-start items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:shadow-[#4bd34b] cursor-pointer" onClick={()=>{
                        dispatch(setSelectedUser(user))
                        setInput("")
                        setSearch(false)
                    }}>
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white">
                            <img src={dp} alt="" className='h-[100%]' />
                        </div>
                        <h1 className="text-gray-800 font-semibold text-[20px]">{user.name || user.username}</h1>
                    </div>
                ))}
            </div>}

            <div className="w-full h-[300px] bg-[#5ed45e] rounded-b-[30%]  shadow-gray-400 shadow-lg flex flex-col gap-[10px] justify-center px-[20px]">
                <h1 className="text-white font-bold text-[25px]">Talksy</h1>
                <div className="'w-full flex justify-between items-center">
                    <h1 className="text-gray-800 font-semibold text-[25px]">
                        Hii, {userData.name || "User"}
                    </h1>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg' onClick={()=>navigate("/profile")}>
                        <img src={dp} alt="" className='h-[100%]'/>
                    </div>
                </div>
                <div>
                    {!serach && <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg bg-white mt-[10px] cursor-pointer" onClick={()=>setSearch(true)}>
                        <FaSearch className="h-[20px] w-[20px]"/>
                    </div>}

                    {serach && 
                        <form className="w-full h-[60px] shadow-gray-500 shadow-lg bg-white flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[10px] relative">
                            <FaSearch className="h-[20px] w-[20px]"/>
                            <input type="text" placeholder="Search Users" className="h-full w-full p-[10px] outline-0 border-0 text-[17px]" onChange={(e)=> setInput(e.target.value)} value={input}/>
                            <ImCross className="h-[20px] w-[20px] cursor-pointer" onClick={handleSerachCross}/>
                        </form>}
                </div>
            </div>

            <div className="w-full h-[60vh] overflow-auto flex flex-col items-center gap-[20px] mt-[20px]">
                {otherUsers?.map((user)=>(
                    <div className="w-[95%] h-[60px] flex justify-start items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:shadow-[#4bd34b] cursor-pointer" onClick={()=>dispatch(setSelectedUser(user))}>
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white">
                            <img src={dp} alt="" className='h-[100%]' />
                        </div>
                        <h1 className="text-gray-800 font-semibold text-[20px]">{user.name || user.username}</h1>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Sidebar