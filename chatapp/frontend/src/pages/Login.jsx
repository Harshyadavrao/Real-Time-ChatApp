import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login(){
    let navigate = useNavigate()
    let [show, setShow] = useState(false)

    let [err, setErr] = useState("")

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    let dispatch = useDispatch() // for setting data in redux or slice
    // let {userData} = useSelector(state => state.user) // for getting data
    

    const handlelogin = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email, password
            },{withCredentials:true})
            console.log(result)
            dispatch(setUserData(result.data))
            navigate("/")
            setEmail("")
            setPassword("")
            setErr("")
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.status, error.response.data);
            } else if (error.request) {
            console.error("No Response:", error.request);
            } else {
            console.error("Axios Error:", error.message);
            }
            setErr(error.response.data.message)
        }
    }
    return(
        <div className='w-full h-[100vh] bg-slate-200 flex justify-center items-center'>
            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
                <div className='w-full h-[200px] bg-[#5ed45e] rounded-b-[30%]  shadow-gray-400 shadow-lg flex justify-center items-center'>
                    <h1 className='text-gray-600 font-bold text-[30px]'>Login to <span className='text-white'>Talksy</span></h1>
                </div>

            <form className='w-full flex flex-col gap-[20px] items-center justify-around mt-[20px]' onSubmit={handlelogin}> 
                <input type="email" name="" id="" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#5ed45e] px-[20px] py-10px] bg-white rounded-lg shadow-gray-300 shadow-lg' onChange={(e) => setEmail(e.target.value)} value={email}/>
                <div className='w-[90%] h-[50px] border-2 border-[#5ed45e] overflow-hidden rounded-lg shadow-gray-300 shadow-lg relative'>
                    <input type={`${show?"text":"password"}`} name="" id="" placeholder='password' className='w-full h-full outline-none px-[20px] py-10px] bg-white' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-[semibold] cursor-pointer' onClick={() => setShow(prev=>!prev)}>{`${show?"hide":"show"}`}</span>
                </div>
                {err && <p className='text-red-500'>{"*" + err}</p>}
                <button className='px-[20px] py-[10px] mt-[20px] bg-[#5ed45e] rounded-lg shadow-gray-300 shadow-lg text-[20px] font-semibold hover:shadow-inner'>Login</button>
                <p className='cursor-pointer' onClick={() => navigate("/signup")}>Create new account <span className='text-[#5ed45e] text-[bold]'>Signup</span></p>
            </form>
            </div>
        </div>
    )
}

export default Login