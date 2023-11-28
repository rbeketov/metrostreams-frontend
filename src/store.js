import { configureStore } from '@reduxjs/toolkit';
import modelingsReducer from './slices/modelingsSlice';

const store = configureStore({
  reducer: {
    modelings: modelingsReducer,
  },
});

export default store;
