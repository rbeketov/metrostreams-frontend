import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logoImage from '/logo.png';
import '../style/Navbar.css';
import personIcon from '/logo-user.png';

import UserProfileMenuPortal from './UserProfileMenuPortal';


function NavbarAnyMetro({ showConstructor = false }) {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [showUserProfileMenu, setShowUserProfileMenu] = React.useState(false);

  const isModerator = (user && user.role === 'MOD') ? true : false;

  // const dispatch = useDispatch();
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
          {isModerator && showConstructor && (
            <Link to="/modelings/edit/" className="btns-log">
              Редактирование видов моделирования
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/modelings/applications" className="btns-log">
              {isModerator ? "Управление заявками" : "Заявки"}
            </Link>
          )
          }
          <Link to="/modelings" className="btns-log">
            Модели
          </Link>
          {isAuthenticated ? (
            <>
              <div className='user-name'>
               {user?.first_name}
              </div>
              <div className='user-name'>
               {user?.second_name}
              </div>
              <div className="user-icon" onClick={handleUserProfileClick}>
                <Image src={personIcon} className="logo-img" alt="Иконка пользователя" />
              </div>
              <Link to="/logout" className="btns-log">
                Выйти
              </Link>
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
