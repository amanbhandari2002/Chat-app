import React from 'react'
import './Navbar.css'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'

import { Link } from 'react-router-dom'
function Navbar() {
  const currentUser =useSelector((state)=>state.userData.data)
  

  return (
    
    <div className="navbar">
        <h4 className="left-comp">Chat</h4>
        <div className="right-comp">
            <span>{currentUser.displayName}</span>
            
            <button onClick={()=>{signOut(auth)}}>Logout</button>
            
            
        </div>
        
    </div>
  )
}

export default Navbar