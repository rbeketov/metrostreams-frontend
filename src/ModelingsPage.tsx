import { FC, useState, useEffect } from 'react';
import { Col, Row, Spinner, Container } from 'react-bootstrap'
import NavbarAnyMetro from './components/Navbar';
import Label from './components/Label';
import InputField from './components/InputField';
import ModelingsCard from './components/ModelCard';
import FooterAnyMetro from './components/Footer';
import { Modelings, getModelings } from './modules/get-modelings';

const ModelingsPage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modelings, setModelings] = useState<Modelings[]>([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState<number | number[]>(0);
  const [maxPrice, setMaxPrice] = useState<number | number[]>(99000);

  const handleSearchSubmit = async () => {
    setLoading(true);
    const currMinPrice = Array.isArray(minPrice) ? minPrice[0] : minPrice
    const currMaxPrice = Array.isArray(maxPrice) ? maxPrice[0] : maxPrice
    const data = await getModelings(searchValue, currMinPrice, currMaxPrice);
    setModelings(data);
    setLoading(false);
  }

  const handleMinSliderChange = (value: number | number[]) => {
    setMinPrice(value);
    if (value > maxPrice) {
      setMaxPrice(value);
    }
  };

  const handleMaxSliderChange = (value: number | number[]) => {
    setMaxPrice(value);
    if (value < minPrice) {
      setMinPrice(value);
    }
  };

  useEffect(() => {
    handleSearchSubmit();
  }, []);

  return (
    <div>
      <NavbarAnyMetro />
      <Label />
          <InputField
            value={searchValue}
            setValue={setSearchValue}
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
}

export default ModelingsPage;
