// Header.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom
import Breadcrumbs from "./Breadcrumbs";
import { FaShoppingCart } from "react-icons/fa";
import "../style/Header.css";

const Header = ({ showCart }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { draft_id, modelingCount } = useSelector((state) => state.bucket);

  return (
    <div className="header">
      <div className="breadcrumbs-container">
        <Breadcrumbs />
      </div>
      {isAuthenticated && showCart && (
        <Link to="/modelings/cart" className="cart-link">
          <div className={`cart-icon-container bucket-style`}>
            <FaShoppingCart size={30} className="" />
            {draft_id && (
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
