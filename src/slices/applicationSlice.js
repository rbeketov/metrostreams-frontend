// applicationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
  },
  reducers: {
    getApplicationsSuccess: (state, action) => {
      state.applications = action.payload;
    },
    
  },
});

export const { getApplicationsSuccess } = applicationSlice.actions;

export default applicationSlice.reducer;
