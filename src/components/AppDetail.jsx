// ResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationById } from '../modules/get-application-byid.ts';

import CartPage from './CartPage.jsx';
import NavbarAnyMetro from './Navbar';
import Header from './Header';

import '../style/CartPage.css'
// import { importExpression } from '@babel/types';


const ResultsPage = () => {
  const { id } = useParams();

  const [loadingResults, setLoadingResults] = useState(false);
  const [modelingResults, setModelingResults] = useState([]);
  const [draftStatus, setDraftStatus] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoadingResults(true);
        const response = await getApplicationById(id);
        setModelingResults(response.modeling);
        setDraftStatus(response.application_data.status_application === 'DRFT');
      } catch (error) {
        console.error('Ошибка при запросе на моделирование', error);
      } finally {
        setLoadingResults(false);
      }
    };

    fetchResults();
  }, [id]);

  if (draftStatus) {
    return <CartPage />
  } else {
    return (
      <div>
          <NavbarAnyMetro showConstructor={true} />
          <Header showCart={false} showApp={true} />
          <div className="applications-container">
              <div className='applications-title'> Заявка № {id}</div>
              {loadingResults ? (
                  <p>Загрузка...</p>
              ) : (
                  <table className='table-applications'>
                  <thead>
                      <tr>
                      <th>Объект моделирования</th>
                      <th>Загруженность, %</th>
                      </tr>
                  </thead>
                  <tbody>
                      {modelingResults.map((result) => (
                      <tr key={result.modeling_id}>
                          <td>{result.modeling_name}</td>
                          <td>{result.modeling_result}</td>
                      </tr>
                      ))}
                  </tbody>
                  </table>
              )}
          </div>
      </div>
    );
  }
};

export default ResultsPage;
