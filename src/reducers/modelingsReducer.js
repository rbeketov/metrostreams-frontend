import {
    SET_SEARCH_VALUE,
    SET_MODELINGS,
    SET_LOADING,
    SET_MIN_PRICE,
    SET_MAX_PRICE,
  } from '../actions/modelingsActions.js';
  
  const initialState = {
    searchValue: '',
    modelings: [],
    loading: false,
    minPrice: 0,
    maxPrice: 99000,
  };
  
  const modelingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCH_VALUE:
        return { ...state, searchValue: action.payload };
      case SET_MODELINGS:
        return { ...state, modelings: action.payload };
      case SET_LOADING:
        return { ...state, loading: action.payload };
      case SET_MIN_PRICE:
        return { ...state, minPrice: action.payload };
      case SET_MAX_PRICE:
        return { ...state, maxPrice: action.payload };
      default:
        return state;
    }
  };
  
  export default modelingsReducer;
  