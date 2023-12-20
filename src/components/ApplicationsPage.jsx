// CartPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '../actions/applicationActions';
import TableRow from './TableRow';
import { useCustomNavigate } from './AuthorizationPage';
import NavbarAnyMetro from './Navbar';
import Header from './Header';

const SHORT_POLLING_INTERVAL = 5000

import '../style/CartPage.css'


const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleGetApplications = async () => {
    if (user) {
      await dispatch(getApplications(user.user_id));
    }
  };
  useEffect(() => {
    handleGetApplications();
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        if (user) {
          await dispatch(getApplications(user.user_id));
        } else {
          navigate('/modelings');
        }
      } catch (error) {
        console.error('Ошибка во время получения заявок:', error);
      }
    }, SHORT_POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, [dispatch, user, navigate]);

  const bucket = useSelector((state) => state.bucket);
  const applications = useSelector((state) => state.applications.applications);

  return (
    <div>
      <NavbarAnyMetro />
      <Header showCart={true} showApp={false} />
      <div className="applications-container">
        <div className='applications-title'>Заявки</div>
        {(bucket.draft_id && applications.length > 1) || (!bucket.draft_id && applications.length > 0) ? (
          <table className='table-applications'>
            <thead>
              <tr>
                <th>№ заявки</th>
                <th>Дата, время формирования</th>
                <th>Дата, время расчёта</th>
                <th>Параметры (л/м:интервал)</th>
                <th>Статус</th>
                <th></th>
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

export default ApplicationsPage;
