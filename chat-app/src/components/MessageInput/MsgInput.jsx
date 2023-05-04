import React, { useState } from 'react'
import './MsgInput.css'
import { doc, updateDoc, arrayUnion, arrayRemove,getDoc, Timestamp, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';



function MsgInput() {
 
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)
  const curFriend = useSelector(state => state.currentFriend.data)
  const curUser = useSelector(state => state.userData.data)
  // console.log(curUser)
  // console.log(curFriend)
  const sendMsg = async () => {
    
    if (img != null) {
      const docSnap = await getDoc(doc(db, "chats", curFriend.uid));
      console.log(33)
      const storageRef = ref(storage, uuid());
      console.log(22)
      const uploadTask = uploadBytesResumable(storageRef, img);
     
        
      uploadTask.on('state_changed',
      (snapshot) => {

      },
      (error) => {

        console.log('err')
      },
        async () => {

          try {
            
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const messages = doc(db, "chats", curFriend.uid);
            console.log(downloadURL)

      
            await updateDoc(messages, {
              messages: arrayUnion({
                id: uuid(),
                text,
                imageUrl:downloadURL,
                senderId: curUser.uid,
                date: Timestamp.now()
              })
            })
          

          }
          catch (e) {
            console.error('err');
          }

        }
      );
      
    }


    else {
      const docSnap = await getDoc(doc(db, "chats", curFriend.uid));
      const messages = doc(db, "chats", curFriend.uid);
      
      await updateDoc(messages, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: curUser.uid,
          date: Timestamp.now()
        })
      });
  
    }


    await updateDoc(doc(db,'userFriends',curUser.uid),{
      [curFriend.uid+'.date']:serverTimestamp()
    })
    setImg(null)
    setText('')
  }
  return (
    <div className="msgInput">
      <input type="text" placeholder='Type Something' value={text} onChange={(e) => setText(e.target.value)} />
      <input id='file' type="file" placeholder='file'  onChange={e => setImg(e.target.files[0])} />
      <label htmlFor="file"><img src="https://cdn-icons-png.flaticon.com/512/3342/3342137.png" alt="" /></label>
      <button onClick={text!='' || img!=null? sendMsg:null}>Send</button>
    </div>
  )
}

export default MsgInput