import initialState from "../initialState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {setLocalStorageItem} from "../../HelperFunctions/HelperFunctions";

export const loginUser = createAsyncThunk(
  'authentication/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post("/api/auth/login", {email, password});
      setLocalStorageItem(data);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const registerUser = createAsyncThunk(
  'authentication/registerUser',
  async ({username, email, password}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post("/api/auth/register", {username, email, password});
      setLocalStorageItem(data);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState.authentication,
  reducers: {
    logout: (state) => {
      state.username = null
      state.email = null
      state.token = null
      state.loading = false
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.token = action.payload.token
      state.loading = false
    },
    [loginUser.rejected]: (state) => {
      state.loading = false
    },
    [registerUser.pending]: (state) => {
      state.loading = true
    },
    [registerUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.token = action.payload.token
      state.loading = false
    },
    [registerUser.rejected]: (state) => {
      state.loading = false
    }
  }
})

export const {logout} = authSlice.actions
export default authSlice.reducer
