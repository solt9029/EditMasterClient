import React from 'react';
import { Row, Container } from 'reactstrap';
import styled from 'styled-components';
import PaletteButton from '../components/PaletteButton';
import { numbers } from '../constants/';

const StyledContainer = styled(Container)`
  margin-bottom: 30px;
`;

const DivisionButtonList = ({ currentValue, setValue, paletteWidth }) => {
  return (
    <StyledContainer>
      <Row>
        {numbers.DIVISIONS.map((value, i) => {
          return (
            <PaletteButton
              active={currentValue === value}
              setValue={setValue}
              paletteWidth={paletteWidth}
              value={value}
              key={i}
            />
          );
        })}
      </Row>
    </StyledContainer>
  );
};

export default DivisionButtonList;
