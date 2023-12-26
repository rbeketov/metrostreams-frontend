// authActions.js
import axios from 'axios';
import { loginSuccess, logoutSuccess } from '../slices/authSlice';
import { resetBucket } from '../slices/bucketSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const loginUser = (login, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:80/api/users/login/', {
      login,
      password,
    }, {
      withCredentials: true,
    });

    dispatch(loginSuccess({ user: response.data }));
  } catch (error) {
    toast.error('Неверный логин или пароль');
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { bucket } = getState();
    const draft_id = bucket.draft_id;

    if (draft_id) {
      await axios.delete(`http://localhost:80/api/applications/${draft_id}/user_delete/`, {
        withCredentials: true,
      });
    }
    dispatch(resetBucket());

    await axios.get('http://localhost:80/api/users/logout/', {
      withCredentials: true,
    });
    
    dispatch(logoutSuccess());

    toast.success('Выход выполнен успешно');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};

