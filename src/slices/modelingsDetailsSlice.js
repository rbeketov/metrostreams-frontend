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
    setModelingDetailField: (state, action) => {
      const { fieldName, fieldValue } = action.payload;
      state.details[fieldName] = fieldValue;
    },
    toInitState: (state) => {
      state.details = {};
      state.details.modeling_image = null;
      state.details.modeling_name = null;
      state.details.modeling_description = null;
      state.details.modeling_price = null;
      state.details.load = null;
    },
  },
});

export const { setModelingsDetailsSlice, toInitState, setModelingDetailField } = modelingsDetailsSlice.actions;
export default modelingsDetailsSlice.reducer;
