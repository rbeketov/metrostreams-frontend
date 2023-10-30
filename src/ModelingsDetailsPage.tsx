import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarAnyMetro from './components/Navbar';
import FooterAnyMetro from './components/Footer';
import { ModelingsDetails, getModelingsDetail } from './modules/get-modelings-detail';
import './ModelingsDetailsPage.css'

const ModelingsDetailsPage: FC = () => {
  const [details, setDetails] = useState<ModelingsDetails | null>(null);
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
                <img src={`data:image/png;base64,${details?.modeling_image}`} alt={details?.modeling_name} className="model-detail-card" />
            </div>
            <div className="model-card-description">
                <h2>{details?.modeling_name}</h2>
                <p>{details?.modeling_description}</p>
                <p>{details?.modeling_price} рублей</p>
                <a className="btn-back-to-models" href="/modelings/">Вернуться к услугам</a>
            </div>
        </div>
        <FooterAnyMetro />
    </div>
  );
}

export default ModelingsDetailsPage;
