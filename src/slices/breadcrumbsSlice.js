// breadcrumbsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState: {
    crumbs: [],
  },
  reducers: {
    addBreadcrumb: (state, action) => {
      state.crumbs.push(action.payload);
    },
    removeLastBreadcrumb: (state) => {
      state.crumbs.pop();
    },
    clearBreadcrumbs: (state) => {
      state.crumbs = [];
    },
    setBreadcrumbs: (state, action) => {
      state.crumbs = action.payload;
    },
  },
});

export const { addBreadcrumb, removeLastBreadcrumb, clearBreadcrumbs, setBreadcrumbs } = breadcrumbsSlice.actions;

export default breadcrumbsSlice.reducer;
