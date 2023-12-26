import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import '../style/InputField.css';
import { parseISO } from 'date-fns';
import moment from 'moment/moment';

const InputFieldApplications = ({
  value,
  setValue,
  placeholder,
  status,
  setStatus,
  minDate,
  maxDate,
  setMinDate,
  setMaxDate
}) => {

  return (
    <InputGroup className="custom-mb-3">
      <Form.Control
        className="custom-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <DatePicker
        selected={minDate !== '' ? moment(minDate).toDate() : ''}
        onChange={(date) => setMinDate(date)}
        selectsStart
        startDate={minDate !== '' ? moment(minDate).toDate() : ''}
        endDate={maxDate !== '' ? moment(maxDate).toDate() : ''}
        placeholderText="Начальная дата"
        className="form-control custom-color"
        locale={ru}
        dateFormat="yyyy-MM-dd"
        maxDate={parseISO('2025-12-10')}
        yearDropdownItemNumber={10}
      />
      <DatePicker
        selected={maxDate !== '' ? moment(maxDate).toDate() : ''}
        onChange={(date) => setMaxDate(date)}
        selectsEnd
        startDate={minDate !== '' ? moment(minDate).toDate() : ''}
        endDate={maxDate !== '' ? moment(maxDate).toDate() : ''}
        placeholderText="Конечная дата"
        className="form-control custom-color"
        locale={ru}
        dateFormat="yyyy-MM-dd"
        maxDate={parseISO('2025-12-10')}
        yearDropdownItemNumber={10}
      />
      <Form.Control
        as="select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className='custom-color'
      >
        <option value="">Выберите статус</option>
        <option value="WORK">Сформирована</option>
        <option value="CANC">Отклонена</option>
        <option value="COMP">Выполнена</option>
      </Form.Control>
    </InputGroup>
  );
};

export default InputFieldApplications;
