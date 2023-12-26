// modelingsDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modelingsDetailsSlice = createSlice({
  name: 'modelingsDetails',
  initialState: {
    details: {},
  },
  reducers: {
    setModelingsDetailsSlice: (state, action) => {
      state.details = action.payload;
    },
    toInitState: (state) => {
      state.details = {};
    },
  },
});

export const { setModelingsDetailsSlice, toInitState } = modelingsDetailsSlice.actions;
export default modelingsDetailsSlice.reducer;
