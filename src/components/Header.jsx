import React from 'react';
import BreadcrumbsBar from './BreadcrumbsBar.jsx';
import { FaShoppingCart } from 'react-icons/fa';
import '../style/Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="breadcrumbs-container">
        <BreadcrumbsBar />
      </div>
      <div className="cart-icon-container">
        <FaShoppingCart size={20} color="#333" />
      </div>
    </div>
  );
};

export default Header;
