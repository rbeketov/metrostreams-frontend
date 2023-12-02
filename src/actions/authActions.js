// authActions.js
import axios from 'axios';
import { loginSuccess, logoutSuccess } from '../slices/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import redirectTo from '../modules/redirect';

export const loginUser = (login, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:80/api/users/login/', {
      login,
      password,
    }, {
      withCredentials: true,
    });

    dispatch(loginSuccess({ user: response.data }));
    toast.success('Вход выполнен успешно');
    redirectTo('/modelings');
  } catch (error) {
    toast.error('Неверный логин или пароль');
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get('http://localhost:80/api/users/logout/', {
      withCredentials: true,
    });
    dispatch(logoutSuccess());
    toast.success('Выход выполнен успешно');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
