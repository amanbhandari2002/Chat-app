import React from 'react';
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuthChange from '../hooks/useAuthChange';
function Login() {
  const [error, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit= async (event)=>{

    event.preventDefault();
    setLoading(true)
    const email = event.target[0].value;
    const password = event.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password)
    }
    catch(err){
      setErr(true);
      console.log('errr')
    }
    setLoading(false)
  }

  useAuthChange();

  // const val=useSelector((state)=>state.userData.data)
  // console.log(val)


  return (
    <div className="container">
     
      { loading? <span>Loading</span>:
        <div className="regBox">
            <h3>Chat App Login</h3>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='Password'/>
                <button>Login</button>
            </form>
            <span>You don't have an account? <Link to={'/register'}> Sign Up</Link></span>

        </div>
}
    </div>
  )
}

export default Login