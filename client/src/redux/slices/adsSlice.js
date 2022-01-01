import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const adsSlice = createSlice({
  name: 'ads',
  initialState: initialState.ads,
  reducers: {
    getAds(state, action) {
      action.payload.forEach(ad => {
        state.push(ad);
      });
    },
    createAd(state, action) {
      state.push(action.payload);
    }
  },
})

export const { getAds, createAd } = adsSlice.actions
export default adsSlice.reducer
