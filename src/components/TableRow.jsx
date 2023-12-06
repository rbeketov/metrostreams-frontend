// TableRow.jsx

import React from 'react';

const TableRow = ({ application }) => {
  const statusAliases = {
    'WORK': 'Сформирована',
    'COMP': 'Выполнена',
    'CANC': 'Отклонена',
  };

  if (application.status_application === 'DRFT') {
    return null;
  }

  return (
    <tr>
      <td>{application.application_id}</td>
      <td>{application.date_application_create}</td>
      <td>{application.date_application_accept}</td>
      <td>{application.date_application_complete}</td>
      <td>{statusAliases[application.status_application]}</td>
      <td>{application.moderator_second_name} {application.moderator_first_name}</td>
      <td>{application.moderator_email}</td>
    </tr>
  );
};

export default TableRow;
