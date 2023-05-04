import React from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import './Sidebar.css'
import UserChat from '../UserChat/UserChat'
function Sidebar() {
  return (
    <div className="Sidebar">
        <Navbar/>
        <Search/>

        <UserChat/>
        {/* <UserChat/>
        <UserChat/>
        <UserChat/> */}


        
        
    </div>
  )
}

export default Sidebar