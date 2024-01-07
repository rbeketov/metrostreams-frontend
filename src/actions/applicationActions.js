// applicationActions.js

import axios from 'axios';
import { getApplicationsSuccess, setSearchValue, setMaxDate, setMinDate, setStatus } from '../slices/applicationSlice'

const convertDateString = (input) => {
  const day = input.getDate();
  const month = input.getMonth() + 1;
  const year = input.getFullYear();
  const result = `${year}-${month}-${day}`;
  return result;
};


export const filterApplicationsUser = (
  data,
  nameUser,
) => {
  const filteredData = data.filter((application) => {
    const applicationNameMatches = (application.user_first_name + ' ' + application.user_second_name.user).toLowerCase().includes(nameUser.toLowerCase());
    return applicationNameMatches;
  });

  return filteredData;
};


export const getApplications = () => async (dispatch, getState) => {
  try {
    const { minDate, maxDate, status, nameUser } = getState().applications;

    const response = await axios.get(`http://localhost:80/api/applications/?date_start=${minDate}&date_end=${maxDate}&status=${status}`, {
      withCredentials: true,
    });
  
    const filteredData = filterApplicationsUser(response.data, nameUser);

    dispatch(getApplicationsSuccess(filteredData));
  } catch (error) {
    console.error('Ошибка получения списка заявок:', error);
  }
};

export const setSearchValueAction = (searchValue) => (dispatch) => {
  dispatch(setSearchValue(searchValue));
};

export const setMinDateAction = (minDate) => (dispatch) => {
  const parseMinDate = convertDateString(minDate)
  dispatch(setMinDate(parseMinDate));
};

export const setMaxDateAction = (maxDate) => (dispatch) => {
  const parseMaxDate = convertDateString(maxDate)
  dispatch(setMaxDate(parseMaxDate));
};

export const setSearchStatusAction = (status) => (dispatch) => {
  dispatch(setStatus(status));
};

export const completeApplication = (id) => async () => {
  try {
    await axios.put(`http://localhost:80/api/applications/${id}/set_status/`, 
    {
      status : 'COMP',
    },
    {
      withCredentials: true,
    });

  } catch (error) {
    console.error('Ошибка при завершении заявки:', error);
  }
};

export const rejectApplication = (id) => async () => {
  try {
    await axios.put(`http://localhost:80/api/applications/${id}/set_status/`, 
    {
      status : 'CANC',
    },
    {
      withCredentials: true,
    });

  } catch (error) {
    console.error('Ошибка при отклонении заявки:', error);
  }
};

export const updateModelingResult = (id, modeling_id, new_result) => async () => {
  try {
    await axios.put(`http://localhost:80/api/applications/${id}/update_result_modeling/`, 
    {
      modeling_id,
      new_result,
    },
    {
      withCredentials: true,
    });

  } catch (error) {
    console.error('Ошибка при обновлении результата моделирования:', error);
  }  
}