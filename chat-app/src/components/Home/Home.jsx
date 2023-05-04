import React from 'react'
import './Home.css'
import Sidebar from '../Sidebar/Sidebar'
import Chat from '../Chat/Chat'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setData } from '../redux/userData'
import useAuthChange from '../hooks/useAuthChange'



function Home() {

  useAuthChange();  // CHECKS ANY CHANGE IN AUTH USER
  

  return (
    <div className="container">
        <div className="chat-box">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home