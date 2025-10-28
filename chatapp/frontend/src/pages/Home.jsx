import React from "react";
import Sidebar from "../components/Sidebar";
import Message from "../components/Message";
import getMessages from "../custom_Hooks/getMessages";

function Home() {
    getMessages()
    return(
        <div className="w-full h-[100vh] flex overflow-hidden">
            <Sidebar/>
            <Message/>
        </div>
    )
}

export default Home