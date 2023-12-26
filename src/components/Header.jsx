// Header.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { FaShoppingCart } from "react-icons/fa";
import "../style/Header.css";

const Header = ({ showCart, showApp, showConstructor }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { draft_id } = useSelector((state) => state.bucket);
  const user = useSelector((state) => state.auth.user);

  
  const isCartActive = draft_id !== null;
  const isModerator = (user && user.role === 'MOD') ? true : false;

  return (
    <div className="header">
      <div className="breadcrumbs-container">
        <Breadcrumbs />
      </div>
      {isAuthenticated && showApp && (
        <Link to="/modelings/applications" className="applications-link">
          <div className="applications-button">
            {isModerator ? "Управление заявками" : "Заявки"}
          </div>
        </Link>
      )}

      {isAuthenticated && showCart && (
        <Link to={isCartActive ? "/modelings/cart" : "#"} className="cart-link">
          <div className={`cart-icon-container bucket-style ${isCartActive ? '' : 'inactive-cart'}`} disabled={!isCartActive}>
            <FaShoppingCart size={30} className="" />
          </div>
        </Link>
      )}
      {isModerator && showConstructor && (
        <Link to={"/modelings/edit/0"} className="cart-link">
          <div className="applications-button">
            Создать вид моделирования
          </div>
        </Link>
      )}    
    </div>
  );
};

export default Header;
