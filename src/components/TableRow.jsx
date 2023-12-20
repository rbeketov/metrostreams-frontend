// TableRow.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/TableRow.css';

const TableRow = ({ application }) => {
  const statusAliases = {
    WORK: 'Сформирована',
    COMP: 'Выполнена',
    CANC: 'Отклонена',
  };

  const [isListOpen, setListOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Подробнее');

  const toggleList = () => {
    setListOpen(!isListOpen);
    setButtonText(isListOpen ? 'Подробнее' : 'Скрыть');
  };

  return (
    <tr>
      <td>{application.application_id}</td>
      <td>{application.date_application_accept}</td>
      <td>{application.date_application_complete}</td>
      <td>{application.people_per_minute}:{application.time_interval}</td>
      <td className={`status-cell ${application.status_application.toLowerCase()}`}>
        {statusAliases[application.status_application]}
      </td>
      <td>
        <Link to={`/modelings/applications/detail/${application.application_id}`} className='details-link'>
          {buttonText}
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
