import React, { useEffect, useState ,useRef} from 'react'
import lakhan from '../../images/lakhna.png'
import './Message.css'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';



function Message() {
  const curUser = useSelector(state => state.userData.data)
  const curFriend = useSelector(state => state.currentFriend.data)
  const [messages,setMsg]=useState([])
  const scrollRef = useRef();

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", curFriend.uid), (doc) => {
      setMsg(Object.entries(doc.data())[0][1])
  });

  return(()=> unsub())
  },[curFriend])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});

  },[messages])

 
  return (
    < div >
  { messages!=[] && messages.map(msg=>{
    return(
    <div className= {`msg ${msg.senderId===curUser.uid && 'owner'}`} key={msg.id} ref={scrollRef}>
      <div className="msgInfo">
        <img src={msg.senderId===curUser.uid? curUser.photoURL: curFriend.uInfo.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className="msgText">
        {msg.text!='' && <p>{msg.text}</p>}
        {msg.imageUrl && <img src={msg.imageUrl} alt="" />}
      </div>
    </div>
    )
})}
    </div>
  )
}

export default Message