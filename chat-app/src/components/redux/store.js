import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import userData from './userData'
import currentFriend from './currentFriend'

export default configureStore({
  reducer: {
    userData: userData,
    currentFriend:currentFriend
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
})


// useSelector(state=>state.userData.data)