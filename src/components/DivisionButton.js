import React from 'react';
import { Button, Col } from 'reactstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

const StyledCol = styled(Col)`
  && {
    padding: 3px;
  }
`;

const DivisionButton = props => {
  const { currentDivision, value, paletteWidth } = props;

  // recalculate col size
  let size = 3;
  if (paletteWidth < 200) {
    size = 12;
  } else if (paletteWidth < 360) {
    size = 6;
  }

  const setDivision = () => {
    props.setDivision(value);
  };

  return (
    <StyledCol xs={size} className="btn-group-toggle">
      <StyledButton
        block
        color="light"
        active={currentDivision === value}
        onClick={setDivision}
      >
        <div>{value}</div>
        <input value={value} type="radio" />
      </StyledButton>
    </StyledCol>
  );
};

export default DivisionButton;
