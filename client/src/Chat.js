import React from 'react'
import { useState } from 'react';

const Chat = ({socket,username,room}) => {

    const[currentmessage,setCurrentmessage]=useState("");

    const sendMessage=async()=>{
        if(currentmessage!==""){
            const messageData={
                room: room,
                author: username,
                message: currentmessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
         await socket.emit("send_message",messageData);
        }
        
    }
  return (
    <div> 
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'></div>
        <div className='chat-footer'>
            <input type="text" placeholder='Hey..' onChange={(e)=>{setCurrentmessage(e.target.value)}}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat