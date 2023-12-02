import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/registrationActions';
import { Link, useNavigate } from 'react-router-dom';

import NavbarAnyMetro from './Navbar';

import '../style/AuthorizationPage.css';

import backgroundImage from '/login-background.jpg';

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const customNavigate = (url) => {
    navigate(url);
  };

  return customNavigate;
};

const RegistrationPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useCustomNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/modelings');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = () => {
    // Создаем объект с данными для регистрации
    const userData = {
      first_name: firstName,
      second_name: secondName,
      email,
      login: username,
      password,
    };

    dispatch(registerUser(userData));
  };

  return (
    <div>
      <NavbarAnyMetro />
      <div className="authorization-container" style={backgroundStyle}>
        <div>
          <div className="custom-form">
            <label htmlFor="firstName">Имя:</label>
            <input
              type="text"
              id="firstName"
              placeholder="Введите имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="secondName">Фамилия:</label>
            <input
              type="text"
              id="secondName"
              placeholder="Введите фамилию"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="button-container">
              <div className="custom-button" onClick={handleRegister}>
                Зарегистрироваться
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hrContainer"></div>
    </div>
  );
};

export default RegistrationPage;
