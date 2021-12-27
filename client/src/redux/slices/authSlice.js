import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState.authentication,
  reducers: {
    login(state, action) {
      state.username = action.payload.user.username
      state.uid = action.payload.user.uid
    },
    register(state, action) {
      state.username = action.payload.user.username
      state.uid = action.payload.user.uid
    },
    logout(state) {
      state.username = null
      state.uid = null
    }
  },
})

export const { login, register, logout } = authSlice.actions
export default authSlice.reducer
