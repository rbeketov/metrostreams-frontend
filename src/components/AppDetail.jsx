import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getApplicationById } from '../modules/get-application-byid.ts';
import { setBucket } from '../actions/bucketActions.js';
import { updateModelingResult } from '../actions/applicationActions.js'

import CartPage from './CartPage.jsx';
import NavbarAnyMetro from './Navbar';
import Header from './Header';

import { toast } from 'react-toastify';

import '../style/CartPage.css';
import '../style/AppDetail.css';

const ResultsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isModerator = (user && user.role === 'MOD') ? true : false;

  const [loadingResults, setLoadingResults] = useState(false);
  const [modelingResults, setModelingResults] = useState([]);
  const [draftStatus, setDraftStatus] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [editedIndex, setEditedIndex] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoadingResults(true);
        const response = await getApplicationById(id);
        setChangeStatus(response.application_data.status_application === 'WORK');
        setDraftStatus(response.application_data.status_application === 'DRFT');
        if (response.application_data.status_application === 'DRFT') {
          dispatch(setBucket(response));
        } else {
          setModelingResults(response.modeling);
        }
      } catch (error) {
        console.error('Ошибка при запросе на моделирование', error);
      } finally {
        setLoadingResults(false);
      }
    };
    fetchResults();
  }, [id]);

  const handleResultChange = async (modelingId, newValue) => {
    try {
      await dispatch(updateModelingResult(id, modelingId, parseFloat(newValue)));
      const response = await getApplicationById(id);
      setModelingResults(response.modeling);
      toast.success('Изменения записаны');
    } catch (error) {
      console.error('Ошибка при обновлении результата моделирования', error);
    } finally {
      setEditedIndex(null);
    }
  };

  const handleEditButtonClick = (index, value) => {
    setEditedIndex(index);
    setEditedValue(value);
  };

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
                  {isModerator && changeStatus && <th>Действие</th>}
                </tr>
              </thead>
              <tbody>
                {modelingResults.map((result, index) => (
                  <tr key={result.modeling_id}>
                    <td>{result.modeling_name}</td>
                    <td>
                      {isModerator && changeStatus && index === editedIndex ? (
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                      ) : (
                        result.modeling_result
                      )}
                    </td>
                    {isModerator && changeStatus && (
                      <td>
                        {index === editedIndex ? (
                          <button className='accept-draft-button' onClick={() => handleResultChange(result.modeling_id, editedValue)}>
                            Сохранить
                          </button>
                        ) : (
                          <button className='accept-draft-button' onClick={() => handleEditButtonClick(index, result.modeling_result)}>
                            Редактировать
                          </button>
                        )}
                      </td>
                    )}
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
