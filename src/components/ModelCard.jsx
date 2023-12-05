import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Подключаем useSelector из react-redux
import '../style/ModelCard.css';


const ModelingsCard = ({
  modeling_id,
  modeling_name,
  modeling_price,
  modeling_image,
}) => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const isUserAuthorized = isAuthenticated && user && user.role === 'USR';

  return (
    <div className="custom-card">
      <Link to={`/modelings/${modeling_id}`} className="card-href">
        <img src={`${modeling_image}`} alt={modeling_name} className="custom-card-img" />
        <div className="custom-card-body">
          <p className="custom-card-text text-center">{modeling_name}</p>
          <p className="custom-card-price text-center">{modeling_price} рублей</p>
        </div>
      </Link>
      
  
      {isUserAuthorized && (
        <div className="add-to-cart-container">
          <a className="add-to-cart-button">В корзину</a>
        </div>
      )}
    </div>
  );
};

export default ModelingsCard;
