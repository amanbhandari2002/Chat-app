import { createSlice } from '@reduxjs/toolkit'

export const currentFriend = createSlice({
  name: 'currentFriend',
  initialState: {
    data: null,
  },
  reducers: {
    setFriend: (state,action) => {
      state.data=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFriend} = currentFriend.actions

export default currentFriend.reducer