
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../style/ModelCard.css';
import { addModelingToBucket } from '../actions/bucketActions';



const ModelingsCard = ({
  modeling_id,
  modeling_name,
  modeling_price,
  modeling_image,
}) => {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const isUserAuthorized = isAuthenticated && user && user.role === 'USR';
  
  const handleAddToBucket = () => {
    dispatch(addModelingToBucket(modeling_id));
  };

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
          <button className="add-to-cart-button" onClick={handleAddToBucket}>
            В корзину
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelingsCard;
