import {combineReducers} from '@reduxjs/toolkit'

import authReducer from "../slices/authSlice";
export const rootReducer = combineReducers({ authentication: authReducer });