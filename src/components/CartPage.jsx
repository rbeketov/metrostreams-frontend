// CartPage.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '../actions/applicationActions';
import TableRow from './TableRow';
import { useCustomNavigate } from './AuthorizationPage';
import NavbarAnyMetro from './Navbar';
import Header from './Header';

import { deleteModelingFromBucket, setParametersBucket, sendBucket } from '../actions/bucketActions'


const DraftApplicationTable = ({ bucket, user_id }) => {
    const dispatch = useDispatch();
    
    const [peoplePerMinute, setPeoplePerMinute] = useState(bucket.people_per_minute || '');
    const [timeInterval, setTimeInterval] = useState(bucket.time_interval || '');
  
    const handleApplyParameters = () => {
        const peoplePerMinuteInt = parseInt(peoplePerMinute, 10);
        const timeIntervalInt = parseInt(timeInterval, 10);
        dispatch(setParametersBucket(peoplePerMinuteInt, timeIntervalInt ));  
    };
  
    const handleRemoveModeling = (modeling_id) => {
      dispatch(deleteModelingFromBucket(modeling_id));
    };

    const handleSendBucket = async () => {
        await dispatch(sendBucket());
        await dispatch(getApplications(user_id));
    };
  
    return (
      <div>
        <h2>Черновая заявка</h2>
        
        {/* Добавленный блок для отображения параметров моделирования */}
        <div>
          <table>
            <tbody>
              <tr>
                <td>Людей в минуту:</td>
                <td>{bucket.people_per_minute}</td>
              </tr>
              <tr>
                <td>Интервал времени:</td>
                <td>{bucket.time_interval}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        {/* Форма для изменения параметров */}
        <div>
          <label htmlFor="peoplePerMinute">Людей в минуту:</label>
          <input
            type="number"
            id="peoplePerMinute"
            value={peoplePerMinute}
            onChange={(e) => setPeoplePerMinute(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="timeInterval">Интервал времени:</label>
          <input
            type="number"
            id="timeInterval"
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
          />
        </div>
        <button onClick={handleApplyParameters}>Применить параметры</button>
        
        {/* Таблица услуг */}
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена, руб.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bucket.bucketItems.map((service) => (
              <tr key={service.modeling_id}>
                <td>{service.modeling_name}</td>
                <td>{service.modeling_price}</td>
                <td>
                  <button onClick={() => handleRemoveModeling(service.modeling_id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSendBucket}>Сформировать заявку</button>
      </div>
    );
  };
  


const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(getApplications(user.user_id));
    } else {
      navigate('/modelings');
    }
  }, [dispatch, user]);

  
  const bucket = useSelector((state) => state.bucket);
  const applications = useSelector((state) => state.applications.applications);


  console.log(bucket.modelingCount);
  console.log(bucket.bucketItems);
  return (
    <div>
      <NavbarAnyMetro />
      <Header showCart={false} />
      <div>
        
        {bucket.draft_id && bucket.modelingCount > 0 && (
          <DraftApplicationTable
            bucket={bucket}
            user_id={user.user_id}
          />
        )}

        <h1>Заявки</h1>
        {(bucket.draft_id && applications.length > 1) || (!bucket.draft_id && applications.length > 0) ? (
          <table>

            <thead>
              <tr>
                <th>№ заявки</th>
                <th>Дата, время создания</th>
                <th>Дата, время формирования</th>
                <th>Дата, время расчёта</th>
                <th>Статус</th>
                <th>Модератор</th>
                <th>Контакт</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <TableRow
                  key={application.application_id}
                  application={application}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>Пока что у вас нет заявок</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
