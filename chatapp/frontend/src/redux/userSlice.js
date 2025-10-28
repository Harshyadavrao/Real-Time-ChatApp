import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null,
        socket:null,
        onlineUsers:null,
        searchData:null
    },
    reducers:{ // used to update the particular state
        setUserData:(state, action)=>{ // state = to access userData
            state.userData=action.payload
        },
        setOtherUsers:(state, action)=>{ // state = to access userData
            state.otherUsers=action.payload
        },
        setSelectedUser:(state, action)=>{ // state = to access userData
            state.selectedUser=action.payload
        },
        setSocket:(state, action)=>{ // state = to access userData
            state.socket=action.payload
        },
        setOnlineUsers:(state, action)=>{ // state = to access userData
            state.onlineUsers=action.payload
        },
        setSearchData:(state, action)=>{ // state = to access userData
            state.searchData=action.payload
        }
    }
})

export const {setUserData, setOtherUsers, setSelectedUser, setSocket, setOnlineUsers, setSearchData} = userSlice.actions

export default userSlice.reducer