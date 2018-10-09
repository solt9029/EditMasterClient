import React from 'react';
import { FormFeedback, Input, Label, FormGroup } from 'reactstrap';

const Form = props => {
  const { label, type, placeholder, name, object, onChange } = props;
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
