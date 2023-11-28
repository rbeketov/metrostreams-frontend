export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_MODELINGS = 'SET_MODELINGS';
export const SET_LOADING = 'SET_LOADING';
export const SET_MIN_PRICE = 'SET_MIN_PRICE';
export const SET_MAX_PRICE = 'SET_MAX_PRICE';

export const setSearchValue = (value) => ({
  type: SET_SEARCH_VALUE,
  payload: value,
});

export const setModelings = (data) => ({
  type: SET_MODELINGS,
  payload: data,
});

export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status,
});

export const setMinPrice = (value) => ({
  type: SET_MIN_PRICE,
  payload: value,
});

export const setMaxPrice = (value) => ({
  type: SET_MAX_PRICE,
  payload: value,
});
