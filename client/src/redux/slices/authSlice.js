import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState.authentication,
  reducers: {
    login(state, action) {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.token = action.payload.token
    },
    register(state, action) {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.token = action.payload.token
    },
    logout(state) {
      state.username = null
      state.email = null
      state.token = null
    }
  },
})

export const { login, register, logout } = authSlice.actions
export default authSlice.reducer
