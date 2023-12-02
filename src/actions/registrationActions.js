// registrationActions.js
import axios from 'axios';

import { loginUser } from './authActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const registerUser = (userData) => async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:80/api/users/registration/', userData);
      dispatch(loginUser(userData.login, userData.password));
      toast.success('Регистрация успешна');
    } catch (error) {
      toast.error('Ошибка при регистрации');
    }
  };
