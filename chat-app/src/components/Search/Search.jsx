import React from 'react'
import './Search.css'
import UserChat from '../UserChat/UserChat'
import { useState } from 'react'
import { collection, query, where, getDocs ,getDoc, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';

function Search() {

  const [username,setUsername]=useState("");
  const [user,setUser]=useState(null);
  const currentUser=useSelector(state=>state.userData.data)
  
  const handleSearch=async ()=>{

    const q = query(collection(db, "users"), where('name', "==", String(username)));
    try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    setUser(doc.data())
});
    }
    catch(err){
      console.log('error')
    }

  }

  const handleKeyDown=(event)=>{
    event.key === 'Enter' && handleSearch(); 

  }

  const selectUser=async ()=>{
    const combinedUID=currentUser.uid<user.uid? user.uid+currentUser.uid: currentUser.uid+user.uid;

    const docSnap = await getDoc(doc(db, "userFriends", currentUser.uid));
    const docfriend = await getDoc(doc(db, "userFriends", user.uid));
    const docChat = await getDoc(doc(db, "chats", combinedUID));
    if(docChat.exists()===false){
      await setDoc(doc(db, "chats", combinedUID), {messages:[]})
    }
    


    if(docSnap.exists()){
      await updateDoc(doc(db, "userFriends", currentUser.uid), {

        [combinedUID]:{
          'userinfo':{
            uid:user.uid,
            displayName:user.name,
            photoURL:user.photoURL},

          'date':serverTimestamp()
          
        },  
      });
    }
    else{

      await setDoc(doc(db, "userFriends", currentUser.uid), {
        [combinedUID]:{
          'userinfo':{
            uid:user.uid,
            displayName:user.name,
            photoURL:user.photoURL},

          'date':serverTimestamp()
          
        },   
      });
      
    }
    
    if(docfriend.exists()){
      console.log(currentUser.photoURL)
      await updateDoc(doc(db, "userFriends", user.uid), {

        [combinedUID]:{
          'userinfo':{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL},

          'date':serverTimestamp()
          
        },  
      });
    }
    else{

      await setDoc(doc(db, "userFriends", user.uid), {
        [combinedUID]:{
          'userinfo':{
            uid:currentUser.uid,
            displayName:currentUser.name,
            photoURL:currentUser.photoURL},

          'date':serverTimestamp()
          
        },   
      });
      
    }
    setUsername('')
    setUser(null)   
      }

    

  return (
    <div className="search">
        <div className="searchForm">
            <input type="text" placeholder='Find a user' value={username} onChange={e=>{setUsername(e.target.value)}} onKeyDown={handleKeyDown}/>
        </div>
        {user!=null && username.length>0?
        <div className="userChat" onClick={selectUser}>
          <div className="chats">
        <div className="userImg"><img src={user.photoURL} alt="mm" /></div>
        <div className="user-chatInfo">
        <span id='name'>{user.name}</span>
        <span id='LastMsg'>Last msg</span>
        </div>
    </div>
        </div>
      :<span></span>}
    </div>
  )
}

export default Search