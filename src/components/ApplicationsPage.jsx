// CartPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '../actions/applicationActions';
import TableRow from './TableRow';
import { useCustomNavigate } from '../modules/redirect'
import NavbarAnyMetro from './Navbar';
import Header from './Header';
import InputFieldApplications from './InputFieldApplications';

import { setSearchValueAction, setMaxDateAction, setMinDateAction, setSearchStatusAction } from '../actions/applicationActions'

const SHORT_POLLING_INTERVAL = 5000

import '../style/CartPage.css'


const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const user = useSelector((state) => state.auth.user);

  const applications = useSelector((state) => state.applications.applications);

  const { minDate, maxDate, status, nameUser } = useSelector(
    (state) => state.applications
  );

  const isModerator = (user && user.role === 'MOD') ? true : false;

  const handleGetApplications = async () => {
    if (user) {
      await dispatch(getApplications());
    }
  };
  useEffect(() => {
    handleGetApplications();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        if (user) {
          await dispatch(getApplications());
        } else {
          navigate('/modelings');
        }
      } catch (error) {
        console.error('Ошибка во время получения заявок:', error);
      }
    }, SHORT_POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <NavbarAnyMetro />
      <Header showCart={false} showApp={false} />
      { isModerator && (
          <InputFieldApplications
            value={nameUser}
            setValue={(value) => dispatch(setSearchValueAction(value))}
            placeholder="Введите имя пользователя"
            status={status}
            setStatus={(value) => dispatch(setSearchStatusAction(value))}
            minDate={minDate}
            maxDate={maxDate}
            setMinDate={(value) => dispatch(setMinDateAction(value))}
            setMaxDate={(value) => dispatch(setMaxDateAction(value))}
          />
        )
      }
      <div className="applications-container">
        <div className='applications-title'>Заявки</div>
        {applications.length > 0 ? (
          <table className='table-applications'>
            <thead>
              <tr>
                <th>№ заявки</th>
                <th>Дата, время формирования</th>
                <th>Дата, время расчёта</th>
                <th>Дата, время завершения</th>
                <th>Параметры (л/м:интервал)</th>
                {isModerator && (
                  <th>Пользователь</th>  
                )}
                <th>Статус</th>
                {isModerator && (
                  <th>Действие</th>  
                )}
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
          isModerator?
          <p>Пока что нет заявок</p>
          :
          <p>Пока что у Вас нет заявок</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
