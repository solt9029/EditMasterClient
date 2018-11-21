import React from 'react';
import { Button, Col } from 'reactstrap';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

const StyledCol = styled(Col)`
  && {
    padding: 3px;
  }
`;

const PaletteButton = props => {
  const { currentValue, value, paletteWidth, color, label } = props;

  // recalculate col size
  let size = 3;
  if (paletteWidth < 200) {
    size = 12;
  } else if (paletteWidth < 360) {
    size = 6;
  }

  const setValue = () => {
    props.setValue(value);
  };

  return (
    <StyledCol xs={size} className="btn-group-toggle">
      <StyledButton
        block
        color={color}
        active={currentValue === value}
        onClick={setValue}
      >
        <div>{label ? label : value}</div>
        {props.children}
      </StyledButton>
    </StyledCol>
  );
};

export default PaletteButton;

PaletteButton.propTypes = {
  color: propTypes.string,
  currentValue: propTypes.any.isRequired,
  value: propTypes.any.isRequired,
  setValue: propTypes.func.isRequired,
  paletteWidth: propTypes.number.isRequired,
  label: propTypes.string,
};

PaletteButton.defaultProps = {
  color: 'light',
};
