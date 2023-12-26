// modelingActions.js
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  setSearchValue,
  setModelings,
  setLoading,
  setMinPrice,
  setMaxPrice,
} from '../slices/modelingsSlice';

import { getModelings } from '../modules/get-modelings';
import { setDraftId } from '../slices/bucketSlice';

const filterModelings = (
  data,
  searchValue,
  minPrice,
  maxPrice,
) => {
  const filteredData = data.filter((model) => {
    const modelNameMatches = model.modeling_name.toLowerCase().includes(searchValue.toLowerCase());
    const priceInRange = parseFloat(model.modeling_price) >= minPrice && parseFloat(model.modeling_price) <= maxPrice;
    return modelNameMatches && priceInRange;
  });

  return filteredData;
};


export const setModelingAction = (searchValue, minPrice, maxPrice) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await getModelings(searchValue, minPrice, maxPrice);
    const draft_id = response[0];
    const data = response[1];

    if (data[0].modeling_image === '/mock.jpg' && data[0].modeling_name === 'Станция Щёлковская') {
      const filteredData = filterModelings(data, searchValue, minPrice, maxPrice);
      dispatch(setModelings(filteredData));
    } else {
      dispatch(setModelings(data));
    }

    dispatch(setLoading(false));


    if (draft_id) {
      dispatch(setDraftId( draft_id ));
    }

  } catch (error) {
    console.error('Ошибка получения объектов моделирования:', error);
    dispatch(setLoading(false));
  }
};

export const setSearchValueAction = (searchValue) => (dispatch) => {
  dispatch(setSearchValue(searchValue));
};

export const setMinPriceAction = (minPrice) => (dispatch) => {
  dispatch(setMinPrice(minPrice));
};

export const setMaxPriceAction = (maxPrice) => (dispatch) => {
  dispatch(setMaxPrice(maxPrice));
};

export const getModelingsForEdit = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:80/api/modelings/?name=&price_under=0&price_upper=999999`,
    {
      withCredentials: true,
    });

    const modelingImageData = [];

    for (const model of response.data.modeling_objects) {
      modelingImageData.push({
        modeling_id: model.modeling_id,
        modeling_name: model.modeling_name,
        modeling_price: model.modeling_price,
        modeling_image: '/mock.jpg',
        modeling_status: model.modeling_status,
      });
    }
  
    dispatch(setModelings(modelingImageData));

  } catch (error) {
    console.error('Ошибка во время отзыва вида моделирования:', error);
  }
}

export const withdrawModeling = (id) => async () => {
  try {
    if (id) {
      await axios.put(`http://localhost:80/api/modelings/${id}/withdraw/`, {
        withCredentials: true,
      });
    }
  } catch (error) {
    console.error('Ошибка во время отзыва вида моделирования:', error);
  }
};

export const recoverModeling = (id) => async () => {
  try {
    if (id) {
      await axios.put(`http://localhost:80/api/modelings/${id}/recover/`, {
        withCredentials: true,
      });
    }

  } catch (error) {
    console.error('Ошибка во время введения вида моделирования:', error);
  }
};

export const deleteModeling = (id) => async () => {
  try {
    if (id) {
      await axios.delete(`http://localhost:80/api/modelings/${id}/delete/`, {
        withCredentials: true,
      });
    }
  } catch (error) {
    toast.warning('Невозможно удалить услугу в работе');
  }
};
