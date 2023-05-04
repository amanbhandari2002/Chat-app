import React, { useEffect, useState } from 'react';
import "./Register.css";
import { createUserWithEmailAndPassword, updateProfile ,onAuthStateChanged} from "firebase/auth";
import { auth } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

import { Link } from 'react-router-dom';
import useAuthChange from '../hooks/useAuthChange';
import {useNavigate} from "react-router-dom"

function Register() {
  const [error, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];
    

    try {
      const data = await createUserWithEmailAndPassword(auth, email, password)


      const date = new Date().getTime();
   
      const metadata = {
        contentType: 'image/jpg'
      };

      const storageRef = ref(storage, `${name + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.log('err')
        },


        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
           
            await updateProfile(auth.currentUser, {
              displayName: name, photoURL: downloadURL
            })

            await setDoc(doc(db, "users", data.user.uid), {
              uid: data.user.uid,
              name:name,
              email:email,
              photoURL: downloadURL,

            });
          
            await setDoc(doc(db, "userFriends", data.user.uid), {});
            
          setLoading(false);
          navigate("/")
          

          }
          catch (e) {
            console.error('err');
          }
        }
      );
    }

    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useAuthChange();

  

  

  
  return (
    
    <div className="container">
      {loading? <span>loading</span> :
      <div className="regBox">
        <Link to={"/"}>home</Link>
        <h3>Chat App Register</h3>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder='Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input type="file" name="file" id="file" />
          <label htmlFor="file">profile</label>
          <button>Sign Up</button>
        </form>
        <span>You have an account? <Link to={'/login'}>Login</Link> </span>

      </div>
}
    </div>
      
      
  )
}

export default Register