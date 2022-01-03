import initialState from "../initialState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createAd = createAsyncThunk(
  'ads/createAd',
  async ({obj}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post("/api/private/ads", {...obj});
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateAd = createAsyncThunk(
  'ads/updateAd',
  async ({obj}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post("/api/private/ads/updateAd", {...obj});
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteAd = createAsyncThunk(
  'ads/deleteAd',
  async ({aid}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post("/api/private/ads/deleteAd", {aid});
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const adsSlice = createSlice({
  name: 'ads',
  initialState: initialState.ads,
  reducers: {
    getAds(state, action) {
      state.items = [];
      action.payload.forEach(ad => {
        state.items.push(ad);
      });
    }
  },
  extraReducers: {
    [createAd.fulfilled]: (state, action) => {
      state.items.push(action.payload.data)
    },
    [updateAd.fulfilled]: (state, action) => {
      const ad = action.payload.data
      let index = global._.findIndex(state.items, {aid: ad.aid});
      state.items.splice(index, 1, ad);
    },
    [deleteAd.fulfilled]: (state, action) => {
      const ad = action.payload.data
      global._.remove(state.items, function (obj) {
        return obj.aid === ad.aid;
      })
    },
  }
})

export const { getAds } = adsSlice.actions
export default adsSlice.reducer
