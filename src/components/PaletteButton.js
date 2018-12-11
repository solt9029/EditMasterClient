import React from 'react';
import { Button, Col } from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

const StyledCol = styled(Col)`
  && {
    padding: 3px;
  }
`;

const PaletteButton = ({
  active,
  value,
  size,
  color,
  label,
  onClick,
  children,
}) => {
  return (
    <StyledCol xs={size} className="btn-group-toggle">
      <StyledButton block color={color} active={active} onClick={onClick}>
        <div>{label ? label : value}</div>
        {children}
      </StyledButton>
    </StyledCol>
  );
};

export default PaletteButton;

PaletteButton.propTypes = {
  color: PropTypes.string,
  active: PropTypes.bool,
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  label: PropTypes.string,
};

PaletteButton.defaultProps = {
  color: 'light',
  active: false,
};
