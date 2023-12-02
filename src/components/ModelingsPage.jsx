import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchValue,
  setModelings,
  setLoading,
  setMinPrice,
  setMaxPrice,
} from '../slices/modelingsSlice';
import { Col, Row, Spinner, Container } from 'react-bootstrap';
import NavbarAnyMetro from './Navbar';
import Header from './Header';
import InputField from './InputField';
import ModelingsCard from './ModelCard';
import FooterAnyMetro from './Footer';
import { getModelings } from '../modules/get-modelings';
import '../style/ModelingsPage.css';
import { addBreadcrumbToChain, removeLastBreadcrumbFromChain } from '../actions/breadcrumbsActions'


const filterModelings = (
  data,
  searchValue,
  minPrice,
  maxPrice,
) => {
  const filteredData = data.filter((model) => {
    const modelNameMatches = model.modeling_name.toLowerCase().includes(searchValue.toLowerCase());
    const priceInRange = parseFloat(model.modeling_price) >= minPrice && parseFloat(model.modeling_price) <= maxPrice;
    return modelNameMatches && priceInRange;
  });

  return filteredData;
};

const ModelingsPage = () => {
  const dispatch = useDispatch();
  const { searchValue, modelings, loading, minPrice, maxPrice } = useSelector(
    (state) => state.modelings
  );

  const breadcrumbs = useSelector((state) => state.breadcrumbs.crumbs);

  const handleSearchSubmit = async () => {
    dispatch(setLoading(true));

    const currMinPrice = Array.isArray(minPrice) ? minPrice[0] : minPrice;
    const currMaxPrice = Array.isArray(maxPrice) ? maxPrice[0] : maxPrice;

    const data = await getModelings(searchValue, currMinPrice, currMaxPrice);

    if (data[0].modeling_image === '/mock.jpg' && data[0].modeling_name === 'Станция Щёлковская') {
      const filteredData = filterModelings(data, searchValue, currMinPrice, currMaxPrice);
      dispatch(setModelings(filteredData));
    } else {
      dispatch(setModelings(data));
    }
    dispatch(setLoading(false));
  };

  const handleMinSliderChange = (value) => {
    dispatch(setMinPrice(value));
    if (value > maxPrice) {
      dispatch(setMaxPrice(value));
    }
  };

  const handleMaxSliderChange = (value) => {
    dispatch(setMaxPrice(value));
    if (value < minPrice) {
      dispatch(setMinPrice(value));
    }
  };

  useEffect(() => {
    if (breadcrumbs.length > 2) {
      dispatch(removeLastBreadcrumbFromChain())
    } else if (breadcrumbs.length == 0) {
      dispatch(addBreadcrumbToChain({ title: 'Главная', url: '/' }));
      dispatch(addBreadcrumbToChain({ title: 'Модели', url: '/modelings' }));
    } 
    handleSearchSubmit();
  }, [dispatch, searchValue, minPrice, maxPrice]);


  return (
    <div>
      <NavbarAnyMetro />
      <Header />
      <InputField
        value={searchValue}
        setValue={(value) => dispatch(setSearchValue(value))}
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

