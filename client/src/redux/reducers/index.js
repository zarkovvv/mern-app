import {combineReducers} from '@reduxjs/toolkit'

import authReducer from "../slices/authSlice";
import adsReducer from "../slices/adsSlice";
export const rootReducer = combineReducers({
  authentication: authReducer,
  ads: adsReducer
});