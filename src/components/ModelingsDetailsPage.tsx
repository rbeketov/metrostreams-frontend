import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarAnyMetro from './Navbar';
import FooterAnyMetro from './Footer';
import { Link } from 'react-router-dom';
import { ModelingsDetailsImage, getModelingsDetail } from '../modules/get-modelings-detail';
import '../style/ModelingsDetailsPage.css'

const ModelingsDetailsPage: FC = () => {
  const [details, setDetails] = useState<ModelingsDetailsImage | null>(null);
  const { id } = useParams<{ id: string }>();

  const handlerGetDetail = async () => {
    if (id) {
      const data = await getModelingsDetail(parseInt(id, 10));
      setDetails(data);
    }
  }

  useEffect(() => {
    handlerGetDetail();
  }, [id]);

  return (
    <div>
        <NavbarAnyMetro />
        <div className="model-card">
            <div className="model-card-image">
                <img src={`${details?.modeling_image}`} alt={details?.modeling_name} className="model-detail-card" />
            </div>
            <div className="model-card-description">
                <h2>{details?.modeling_name}</h2>
                <p>{details?.modeling_description}</p>
                <p>{details?.modeling_price} рублей</p>
                <Link to="/modelings/" className="btn-back-to-models">Вернуться к услугам</Link>
            </div>
        </div>
        <FooterAnyMetro />
    </div>
  );
}

export default ModelingsDetailsPage;
