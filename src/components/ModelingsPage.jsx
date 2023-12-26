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


const ModelingsPage = () => {
  const dispatch = useDispatch();

  const { searchValue, modelings, loading, minPrice, maxPrice } = useSelector(
    (state) => state.modelings
  );


  const handleSearchSubmit = async () => {
    await dispatch(setModelingAction(searchValue, minPrice, maxPrice));
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
  }, []);

  return (
    <div>
      <NavbarAnyMetro showConstructor={true} />
      <Header showCart={true} showApp={true} showConstructor={false}/>
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