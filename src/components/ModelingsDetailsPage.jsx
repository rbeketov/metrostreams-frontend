import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavbarAnyMetro from './Navbar';
import FooterAnyMetro from './Footer';
import Header from './Header';
import { Link } from 'react-router-dom';
import { getModelingsDetails } from '../actions/modelingsDetailsActions';
import { addBreadcrumbToChain } from '../actions/breadcrumbsActions';
import '../style/ModelingsDetailsPage.css';

const ModelingsDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const details = useSelector((state) => state.modelingsDetails.details);

  useEffect(() => {
    if (id) {
      dispatch(getModelingsDetails(id));
      dispatch(addBreadcrumbToChain({ title: details?.modeling_name, url: `/modelings/${id}` }));
    }
  }, [id, dispatch, details?.modeling_name]);

  return (
    <div>
      <NavbarAnyMetro />
      <Header />
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
