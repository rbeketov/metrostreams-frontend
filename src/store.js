import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import modelingsReducer from './slices/modelingsSlice';
import breadcrumbsReducer from './slices/breadcrumbsSlice';
import modelingsDetailsReducer from './slices/modelingsDetailsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    modelings: modelingsReducer,
    breadcrumbs: breadcrumbsReducer,
    modelingsDetails: modelingsDetailsReducer,
    auth: authReducer,
  },
    middleware: [thunk],
});


export default store;
