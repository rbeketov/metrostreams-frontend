import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/TableRowModelings.css';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { withdrawModeling, recoverModeling, deleteModeling, getModelingsForEdit } from '../actions/modelingsActions'

const TableRowModelings = ({ modeling }) => {
  const statusAliases = {
    WORK: 'В работе',
    WITH: 'Отозвана',
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectToEdit = () => {
    navigate(`/modelings/edit/${modeling.modeling_id}`);
  };

  const handleWithdraw = async () => {
    await dispatch(withdrawModeling(modeling.modeling_id));
    await dispatch(getModelingsForEdit());
  };

  const handleRecover = async () => {
    await dispatch(recoverModeling(modeling.modeling_id));
    await dispatch(getModelingsForEdit());
  };

  const handleDelete = async () => {
    await dispatch(deleteModeling(modeling.modeling_id));
    await dispatch(getModelingsForEdit());
  };

  return (
    <tr className='table-row'>
      <td onClick={redirectToEdit}> {modeling.modeling_id}</td>
      <td onClick={redirectToEdit}> {modeling.modeling_name}</td>
      <td onClick={redirectToEdit}> {modeling.modeling_price}</td>
      <td onClick={redirectToEdit} className={`status-cell ${modeling.modeling_status.toLowerCase()}`}>
        {statusAliases[modeling.modeling_status]}
      </td>
      <td>
       {modeling.modeling_status == 'WORK' ? (
          <Link onClick={handleWithdraw} className='form-button withdraw-button'> Отозвать </Link>
        ) : (
          <Link onClick={handleRecover} className='form-button recover-button'> В работу </Link>
        )}
      </td>
      <td>
        <Link onClick={handleDelete} className='form-button delete-button'> Удалить </Link>
      </td>
    </tr>
  );
};

export default TableRowModelings;
