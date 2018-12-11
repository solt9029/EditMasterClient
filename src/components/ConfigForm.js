import React from 'react';
import { FormFeedback, Input, Label, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

const ConfigForm = ({ label, type, placeholder, name, form, onChange }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        invalid={form.errors.length > 0}
        value={form.value}
        onChange={onChange}
      />
      {form.errors.map((error, i) => {
        return <FormFeedback key={i}>{error}</FormFeedback>;
      })}
    </FormGroup>
  );
};

export default ConfigForm;

ConfigForm.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  form: PropTypes.shape({
    errors: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.any,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

ConfigForm.defaultProps = {
  type: 'text',
};
