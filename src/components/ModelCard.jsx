
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../style/ModelCard.css';
import { addModelingToBucket } from '../actions/bucketActions';
import { setModelingAction } from '../actions/modelingsActions';


const ModelingsCard = ({
  modeling_id,
  modeling_name,
  modeling_price,
  modeling_image,
  modeling_status,
}) => {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { searchValue, minPrice, maxPrice } = useSelector(
    (state) => state.modelings
  );

  const handleAddToBucket = async () => {
    await dispatch(addModelingToBucket(modeling_id));
    await dispatch(setModelingAction(searchValue, minPrice, maxPrice));
  };

  return (
    <div className={`custom-card ${modeling_status === 'WITH'? 'inactiv' : ''}`}>
      <Link to={`/modelings/${modeling_id}`} className="card-href">
        <img src={`${modeling_image}`} alt={modeling_name} className={`${modeling_status === 'WITH'? 'inactiv-img' : 'custom-card-img'}`} />
        <div className="custom-card-body">
          <p className="custom-card-text text-center">{modeling_name}</p>
          <p className="custom-card-price text-center">{modeling_price} рублей</p>
        </div>
      </Link>
      
  
      {isAuthenticated && modeling_status !== 'WITH' && (
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
