import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logoImage from '/logo.png';
import '../style/Navbar.css';
import personIcon from '/logo-user.png';

import UserProfileMenuPortal from './UserProfileMenuPortal';


function NavbarAnyMetro() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [showUserProfileMenu, setShowUserProfileMenu] = React.useState(false);

  const handleUserProfileClick = () => {
    setShowUserProfileMenu(!showUserProfileMenu);
  };

  const handleCloseUserProfileMenu = () => {
    setShowUserProfileMenu(false);
  };

  return (
    <Navbar className="color-navbar" expand="lg">
      <Container>
        <Link to="/">
          <Image src={logoImage} roundedCircle className="logo-img" alt="Логотип AnyMetro" />
        </Link>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          AnyMetro
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Link to="/modelings" className="btns-log">
            Модели
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/logout" className="btns-log">
                Выйти
              </Link>
              <div className="user-icon" onClick={handleUserProfileClick}>
                <Image src={personIcon} className="logo-img" alt="Иконка пользователя" />
              </div>
              <UserProfileMenuPortal user={user} show={showUserProfileMenu} onClose={handleCloseUserProfileMenu} />
            </>
          ) : (
            <>
              <Link to="/registration" className="btns-log">
                Зарегистрироваться
              </Link>
              <Link to="/login" className="btns-log">
                Войти
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarAnyMetro;
