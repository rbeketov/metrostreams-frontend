// Header.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { FaShoppingCart } from "react-icons/fa";
import "../style/Header.css";

const Header = ({ showCart, showApp }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { draft_id, modelingCount } = useSelector((state) => state.bucket);

  const isCartActive = draft_id && modelingCount > 0;

  return (
    <div className="header">
      <div className="breadcrumbs-container">
        <Breadcrumbs />
      </div>
      {isAuthenticated && showApp && (
        <Link to="/modelings/applications" className="applications-link">
          <a className="applications-button">Заявки</a>
        </Link>
      )}
      {isAuthenticated && showCart && (
        <Link to={isCartActive ? "/modelings/cart" : "#"} className="cart-link">
          <div className={`cart-icon-container bucket-style ${isCartActive ? '' : 'inactive-cart'}`} disabled={!isCartActive}>
            <FaShoppingCart size={30} className="" />
            {isCartActive && (
              <div className="cart-counter">
                <span>{modelingCount}</span>
              </div>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
