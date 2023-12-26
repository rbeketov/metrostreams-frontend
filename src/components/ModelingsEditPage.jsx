import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {  Container } from 'react-bootstrap';
import NavbarAnyMetro from './Navbar';
import Header from './Header';

import TableRowModelings from './TableRowModelings'
import '../style/ModelingsEditPage.css';

import { getModelingsForEdit } from '../actions/modelingsActions'

const ModelingsEditPage = () => {
  const dispatch = useDispatch();
  const { modelings } = useSelector(
    (state) => state.modelings
  );

  useEffect(() => {
    dispatch(getModelingsForEdit())
  }, [dispatch]);

  return (
    <div>
      <NavbarAnyMetro showConstructor={true}/>
      <Header showCart={false} showApp={true} showConstructor={true}/>
      <Container className="mx-auto">
        <div>
          {!modelings?.length ? (
            <div className="text-center сustom-text">К сожалению, пока ничего не найдено :(</div>
          ) : (
            <div className="modelings-container">
              <div className='modelings-title'>Виды моделирования</div>
              <table className='table-modelings'>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Название вида моделирования</th>
                    <th>Цена</th>
                    <th>Статус</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {modelings.map((item, index) => (
                      <TableRowModelings
                        key={index}
                        modeling={item}
                      />
                  ))}
                </tbody>
              </table>
          </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ModelingsEditPage;