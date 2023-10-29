import React, { FC, useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap'
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

  const handleSearchSubmit = async () => {
    setLoading(true);
    const data = await getModelings(searchValue);
    setModelings(data);
    setLoading(false);
  }

  return (
    <div>
      <NavbarAnyMetro />
      <Label />
      <div className={`container ${loading && 'containerLoading'}`}>
        {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
        <InputField
          value={searchValue}
          setValue={setSearchValue}
          onSubmit={handleSearchSubmit}
          loading={loading}
          placeholder="Поиск..."
          buttonTitle="Искать"
        />
        <div>
          {!modelings?.length && <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>}

          <Row xs={4} md={4} className="g-4">
            {modelings?.map((item, index) => (
              <Col key={index}>
                <ModelingsCard {...item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <FooterAnyMetro />
    </div>
  );
}

export default ModelingsPage;
