import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications, completeApplication, rejectApplication } from '../actions/applicationActions';
import '../style/TableRow.css';
import { Link } from "react-router-dom";

const TableRow = ({ application }) => {
  const statusAliases = {
    WORK: 'Сформирована',
    COMP: 'Выполнена',
    CANC: 'Отклонена',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isModerator = (user && user.role === 'MOD') ? true : false;

  const redirectToDetail = () => {
    navigate(`/modelings/applications/${application.application_id}`);
  };

  const handleComplete = async () => {
    await dispatch(completeApplication(application.application_id));
    await dispatch(getApplications());
  };

  const handleReject = async () => {
    await dispatch(rejectApplication(application.application_id));
    await dispatch(getApplications());
  };

  return (
    <tr className='table-row'>
      <td onClick={redirectToDetail}>{application.application_id}</td>
      <td onClick={redirectToDetail}>{application.date_application_create}</td>
      <td onClick={redirectToDetail}>{application.date_application_accept}</td>
      <td onClick={redirectToDetail}>{application.date_application_complete}</td>
      <td onClick={redirectToDetail}>{application.people_per_minute}:{application.time_interval}</td>
      {isModerator && (
        <td onClick={redirectToDetail}>{application.user_first_name} {application.user_second_name}</td>  
      )}
      <td onClick={redirectToDetail} className={`status-cell ${application.status_application.toLowerCase()}`}>
        {statusAliases[application.status_application]}
      </td>
      {isModerator && (
        <td>
          {application.status_application === 'WORK' && (
            <>
              <Link onClick={handleComplete} className='form-button complete-button'> Завершить </Link>
              <Link onClick={handleReject} className='form-button reject-button'> Отклонить </Link>
            </>
          )
          }
        </td>  
      )}
    </tr>
  );
};

export default TableRow;
