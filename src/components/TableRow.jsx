import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/TableRow.css';

const TableRow = ({ application }) => {
  const statusAliases = {
    WORK: 'Сформирована',
    COMP: 'Выполнена',
    CANC: 'Отклонена',
  };
  const navigate = useNavigate();

  const redirectToDetail = () => {
    navigate(`/modelings/applications/detail/${application.application_id}`);
  };

  return (
    <tr className='table-row' onClick={redirectToDetail}>
      <td>{application.application_id}</td>
      <td>{application.date_application_create}</td>
      <td>{application.date_application_accept}</td>
      <td>{application.date_application_complete}</td>
      <td>{application.people_per_minute}:{application.time_interval}</td>
      <td className={`status-cell ${application.status_application.toLowerCase()}`}>
        {statusAliases[application.status_application]}
      </td>
    </tr>
  );
};

export default TableRow;
