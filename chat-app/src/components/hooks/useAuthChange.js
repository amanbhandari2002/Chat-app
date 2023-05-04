import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setData } from '../redux/userData'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'


// THIS FUCNTION WILL CHECK IF THERE ANY CHANGE HAPPENS IN AUTH USER.

function useAuthChange() {

    const dispatch = useDispatch()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch(setData(user));
        });
        return () => {
            unsub();
        }
    }, [])

}

export default useAuthChange