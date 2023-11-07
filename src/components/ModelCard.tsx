import { FC } from 'react';
import { Link } from 'react-router-dom';
import '../style/ModelCard.css';

interface Modelings {
  modeling_id: number;
  modeling_name: string;
  modeling_price: string;
  modeling_image: string;
}

const ModelingsCard: FC<Modelings> = ({
  modeling_id,
  modeling_name,
  modeling_price,
  modeling_image,
}) => (
    <div className="custom-card">
    <Link to={`/modelings/${modeling_id}`} className="card-href">
      <img src={`${modeling_image}`} alt={modeling_name} className="custom-card-img" />
      <div className="custom-card-body">
        <p className="custom-card-text text-center">{modeling_name}</p>
        <p className="custom-card-price text-center">{modeling_price} рублей</p>
      </div>
    </Link>
  </div>
);

export default ModelingsCard;
