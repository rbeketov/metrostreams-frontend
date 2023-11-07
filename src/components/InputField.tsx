import { FC } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../style/InputField.css';

interface SearchValue {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  placeholder?: string;
  buttonTitle?: string;
  minPrice: number | number[];
  maxPrice: number | number[];
  setMinPrice: (value: number | number[]) => void;
  setMaxPrice: (value: number | number[]) => void;
  lowerTreshold: number;
  upperTreshold: number;
  step: number;
}

const InputField: FC<SearchValue> = ({
  value,
  setValue,
  onSubmit,
  placeholder,
  buttonTitle,
  minPrice = 0,
  maxPrice = 99000,
  setMinPrice,
  setMaxPrice,
  lowerTreshold,
  upperTreshold,
  step,
}) => {
  return (
    <InputGroup className="custom-mb-3">
      <Form.Control
        className="custom-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="outline-secondary my-custom-button"
        onClick={onSubmit}
      >
        {buttonTitle}
      </Button>
      <DropdownButton variant="outline-secondary my-custom-button" title="По цене">
        <Form.Label>От {minPrice}</Form.Label>
        <Slider
          min={lowerTreshold}
          max={upperTreshold}
          step={step}
          value={minPrice}
          onChange={setMinPrice}
        />
        <Form.Label>До {maxPrice}</Form.Label>
        <Slider
          min={lowerTreshold}
          max={upperTreshold}
          step={step}
          value={maxPrice}
          onChange={setMaxPrice}
        />
      </DropdownButton>
    </InputGroup>
  );
};

export default InputField;
