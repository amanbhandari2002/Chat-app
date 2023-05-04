import React from 'react'
import './Chat.css'
import Messages from '../Messages/Messages'
import MsgInput from '../MessageInput/MsgInput'
import { useSelector } from 'react-redux'

function Chat() {
  const curFriend=useSelector(state=>state.currentFriend.data)

  return (

    <div className="chat">
      <div className="userInfo">
        <div className="Username">{curFriend?.uInfo.displayName}</div>
      </div>
      <Messages/>
      <MsgInput/>
    </div>
  )
}

export default Chat