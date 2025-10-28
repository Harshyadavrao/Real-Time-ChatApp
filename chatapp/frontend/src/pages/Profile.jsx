import React from "react";
import dp from "../assets/dp.webp"
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { serverUrl } from "../main";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

function Profile() {
    let navigate = useNavigate()
    let {userData} = useSelector(state=>state.user)
    let dispatch = useDispatch();
    let [name, setName] = useState(userData.name || "")
    let [saving, setSaving] = useState(false)

    const handleProfile = async(e)=>{
        setSaving(true)
        e.preventDefault()

        try {

            let formData = new FormData()
            formData.append("name", name)

            let result = await axios.put(`${serverUrl}/api/user/profile`, {name: name}, {withCredentials:true})
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error)
            setSaving(false)
        }
    }

    return(
        <div className="w-full h-[100vh] bg-slate-200 flex justify-center items-center">
        <div className="w-full max-w-[500px] h-[600px] bg-[white] flex flex-col justify-center items-center shadow-gray-400 shadow-lg">
            <div className="fixed top-[20px] left-[20px] cursor-pointer" onClick={()=>navigate("/")}><IoIosArrowBack className="w-[50px] h-[50px] text-gray-600 "/></div>
            <div className="bg-white rounded-full border-4 border-[black] shadow-gray-400 shadow-lg relative">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                    <img src={dp} alt="" className="h-[100%]"/>
                </div>
                <IoCameraOutline className= "absolute bottom-6 right-5 text-black-700 w-[30px] h-[30px]"/>
            </div>

            <form className='w-full flex flex-col gap-[20px] items-center justify-around mt-[20px]' action="" onSubmit={handleProfile}>
                <input type="text" placeholder="Enter your name" className='w-[90%] h-[50px] outline-none border-2 border-[#5ed45e] px-[20px] py-10px] bg-white rounded-lg shadow-gray-300 shadow-lg text-gray-700' onChange={(e)=>setName(e.target.value)} value={name}/>
                <input type="text" value={userData?.username} readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#5ed45e] px-[20px] py-10px] bg-white rounded-lg shadow-gray-300 shadow-lg text-gray-400'/>
                <input type="email" value={userData?.email} readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#5ed45e] px-[20px] py-10px] bg-white rounded-lg shadow-gray-300 shadow-lg text-gray-400'/>
                 <button className='px-[20px] py-[10px] mt-[20px] bg-[#5ed45e] rounded-lg shadow-gray-300 shadow-lg text-[20px] font-semibold hover:shadow-inner' disabled={saving}>{saving?"Saving...": "Save Profile"}</button>
            </form>
            </div>
        </div>
    )
}

export default Profile