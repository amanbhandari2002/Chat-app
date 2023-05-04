import React from 'react'
import './Messages.css'
import Message from '../Message/Message'
import { useSelector } from 'react-redux'

function Messages() {
  const curFriend = useSelector(state => state.currentFriend.data)
  return (
    <div className='messages'>
      {curFriend!=null?
        <Message/>:<></>
      }
        
    
    </div>
  )
}

export default Messages