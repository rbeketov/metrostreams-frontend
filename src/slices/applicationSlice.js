// applicationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    minDate: '',
    maxDate: '',
    status: '',
    nameUser: '',
  },
  reducers: {
    getApplicationsSuccess: (state, action) => {
      state.applications = action.payload;
    },

    setMinDate: (state, action) => {
      return { ...state, minDate: action.payload };
    },
    setMaxDate: (state, action) => {
      return { ...state, maxDate: action.payload };
    },
    setStatus: (state, action) => {
      return { ...state, status: action.payload};
    },
    setSearchValue: (state, action) => {
      return { ...state, nameUser: action.payload};
    }
  },
});

export const { getApplicationsSuccess, setMinDate, setMaxDate, setStatus, setSearchValue } = applicationSlice.actions;

export default applicationSlice.reducer;
