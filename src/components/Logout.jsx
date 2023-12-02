// Logout.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate('/');
    };

    handleLogout();
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Выход</p>
    </div>
  );
};

export default Logout;
