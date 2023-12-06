// applicationActions.js

import axios from 'axios';
import { getApplicationsSuccess } from '../slices/applicationSlice'

export const getApplications = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:80/api/applications`, {
      withCredentials: true,
    });

    dispatch(getApplicationsSuccess(response.data));
  } catch (error) {
    console.error('Ошибка получения списка заявок:', error);
  }
};
