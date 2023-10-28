import React, { FC, useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap'
import NavbarAnyMetro from './components/Navbar';
import Label from './components/Label';
import InputField from './components/InputField';
import ModelingsCard from './components/ModelCard';
import FooterAnyMetro from './components/Footer';
import { Modelings, ModelingsResult, getModelings } from './modules/get-modelings'; // Импортируйте функцию и типы из вашего файла api

const ModelingsPage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modelings, setModelings] = useState<Modelings[]>([]);

  const handleSearchSubmit = () => {
      getModelings(searchValue).then((data: ModelingsResult) => {
      setModelings(data.results);
    });
  };

  useEffect(() => {
    getModelings()
      .then((data: ModelingsResult) => {
        setModelings(data.results);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
      });
  }, []);

  return (
    <div>
      <NavbarAnyMetro />
      <Label />
      <InputField
        value={searchValue}
        setValue={setSearchValue}
        onSubmit={handleSearchSubmit}
        placeholder="Поиск..."
        buttonTitle="Искать"
      />
      <div>
        {modelings ? (
          <Row xs={4} md={4} className="g-4">
            {modelings.map((item, index) => (
              <Col key={index}>
                <ModelingsCard {...item} />
              </Col>
            ))}
          </Row>
        ) : (
          <h1>К сожалению, пока ничего не найдено</h1>
        )}
      </div>
      <FooterAnyMetro />
    </div>

  );
}

export default ModelingsPage;
