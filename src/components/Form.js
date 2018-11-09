import React from 'react';
import { FormFeedback, Input, Label, FormGroup } from 'reactstrap';
import propTypes from 'prop-types';

const Form = ({ label, type, placeholder, name, object, onChange }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        invalid={object.touched && object.errors.length > 0}
        value={object.value}
        onChange={onChange}
      />
      {object.errors.map((error, i) => {
        return <FormFeedback key={i}>{error}</FormFeedback>;
      })}
    </FormGroup>
  );
};

export default Form;

Form.propTypes = {
  label: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  name: propTypes.string,
  object: propTypes.shape({
    touched: propTypes.bool,
    errors: propTypes.arrayOf(propTypes.string),
    value: propTypes.any,
  }),
  onChange: propTypes.func,
};
