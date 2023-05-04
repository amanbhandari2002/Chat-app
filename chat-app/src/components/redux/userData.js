import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
  name: 'userData',
  initialState: {
    data: null,
  },
  reducers: {
    setData: (state,action) => {
      state.data=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setData} = userData.actions

export default userData.reducer