import React from 'react'
import { useState,useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({socket,username,room}) => {

    const[currentmessage,setCurrentmessage]=useState("");
    const[messagelist,setMessagelist]=useState([]);

    const sendMessage=async()=>{
        if(currentmessage!==""){
            const messageData={
                room: room,
                author: username,
                message: currentmessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
         await socket.emit("send_message",messageData);
         setMessagelist((list)=>[...list,messageData])
         setCurrentmessage("");
        }
        
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
           setMessagelist((list)=>[...list,data])
        })
     },[socket])

  return (
    <div> 
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom>
                    {messagelist.map((messageContent)=>{
                        return (
                            <div className='message' id={username===messageContent.author ? "you" : "other"}>
                                <div>
                                    <div className='message-content'>{messageContent.message}</div>
                                    <div className='message-meta'>
                                        <p>{messageContent.time}</p>
                                        <p>{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" value={currentmessage} placeholder='Hey..' onChange={(e)=>{setCurrentmessage(e.target.value)}}
             onKeyPress={(e)=>{
                e.key==="Enter" && sendMessage();}}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat