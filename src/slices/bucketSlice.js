// bucketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bucketSlice = createSlice({
  name: 'bucket',
  initialState: {
    bucketItems: [],
    draft_id: null,
    modelingCount: 0,
  },
  reducers: {
    setBucketItem: (state, action) => {
        state.bucketItems = action.payload;
        state.modelingCount = action.payload.length;
    },
    setDraftId: (state, action) => {
      state.draft_id = action.payload;
    },
  },
});

export const { setBucketItem, setDraftId } = bucketSlice.actions;

export default bucketSlice.reducer;
