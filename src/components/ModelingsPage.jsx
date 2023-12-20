import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setModelingAction,
  setSearchValueAction,
  setMinPriceAction,
  setMaxPriceAction,
} from '../actions/modelingsActions';
import { Col, Row, Spinner, Container } from 'react-bootstrap';
import NavbarAnyMetro from './Navbar';
import Header from './Header';
import InputField from './InputField';
import ModelingsCard from './ModelCard';
import FooterAnyMetro from './Footer';
import '../style/ModelingsPage.css';
import { getBucket } from '../actions/bucketActions';


const ModelingsPage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { searchValue, modelings, loading, minPrice, maxPrice } = useSelector(
    (state) => state.modelings
  );

  const draft_id = useSelector((state) => state.bucket.draft_id);

  const handleSearchSubmit = async () => {
    dispatch(setModelingAction(searchValue, minPrice, maxPrice));
  };

  const handleMinSliderChange = (value) => {
    dispatch(setMinPriceAction(value));
    if (value > maxPrice) {
      dispatch(setMaxPriceAction(value));
    }
  };

  const handleMaxSliderChange = (value) => {
    dispatch(setMaxPriceAction(value));
    if (value < minPrice) {
      dispatch(setMinPriceAction(value));
    }
  };

  useEffect(() => {
    handleSearchSubmit();
  }, [dispatch, searchValue, minPrice, maxPrice]);

  useEffect(() => {
    if (isAuthenticated && draft_id) {  
      dispatch(getBucket(draft_id));
    }
  }, [dispatch, isAuthenticated, draft_id]);


  return (
    <div>
      <NavbarAnyMetro />
      <Header showCart={true} showApp={true}/>
      <InputField
        value={searchValue}
        setValue={(value) => dispatch(setSearchValueAction(value))}
        onSubmit={handleSearchSubmit}
        loading={loading}
        placeholder="Введите поисковый запрос"
        buttonTitle="Искать"
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={handleMinSliderChange}
        setMaxPrice={handleMaxSliderChange}
        lowerTreshold={0}
        upperTreshold={9900}
        step={1000}
      />

      <Container className="mx-auto">
        <div className={`mx-auto ${loading ? 'custom-loading' : 'custom-container'} text-center d-flex align-items-center justify-content-center`}>
          {loading && <div className="loadingBg"><Spinner animation="border" /></div>}
        </div>
        <div>
          {!modelings?.length ? (
            <div className="text-center сustom-text">К сожалению, пока ничего не найдено :(</div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {modelings.map((item, index) => (
                <Col key={index}>
                  <ModelingsCard {...item} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
      <FooterAnyMetro />
    </div>
  );
};

export default ModelingsPage;