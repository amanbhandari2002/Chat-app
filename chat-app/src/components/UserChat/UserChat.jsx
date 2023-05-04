import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import './UserChat.css'
import { useDispatch } from 'react-redux';
import { setFriend } from '../redux/currentFriend';


import { useSelector } from 'react-redux';
function UserChat() {
  const currentUser=useSelector(state=>state.userData.data)
  const [chats,setchats]=useState([])
  const dispatch=useDispatch()



  useEffect(()=>{
    
    const unsub = onSnapshot(doc(db, "userFriends",currentUser.uid), (doc) => {
      setchats(Object.entries(doc.data()))
  });

  return ()=>{
    unsub();
  }
  },[currentUser.uid])

  const curFriend=(uid,uInfo)=>{
    dispatch(setFriend({uid,uInfo}))
  }

  return (
    
     <div className="chats">
      {chats.sort((a,b)=>b[1].date-a[1].date).map((chat)=>{
        return(
          <div className='userInfoChats' key={chat[0]} onClick={()=>curFriend(chat[0],chat[1].userinfo)}>
       
        <div className="userImg"><img src={chat[1].userinfo.photoURL} alt="mm" /></div>
        <div className="user-chatInfo">
        <span id='name'>{chat[1].userinfo.displayName}</span>
        <span id='LastMsg'>Last msg</span>
        </div>
        </div>
        )
        })}

    </div>
  
  )
}

export default UserChat