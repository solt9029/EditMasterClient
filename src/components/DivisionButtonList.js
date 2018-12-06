import React from 'react';
import { Row } from 'reactstrap';
import PaletteButton from '../components/PaletteButton';
import { Numbers } from '../constants/';
import Container from '../styled/Container';

const DivisionButtonList = ({
  currentDivision,
  setCurrentDivision,
  paletteWidth,
}) => {
  return (
    <Container bottom={30}>
      <Row>
        {Numbers.DIVISIONS.map((value, i) => {
          return (
            <PaletteButton
              active={currentDivision === value}
              setValue={setCurrentDivision}
              paletteWidth={paletteWidth}
              value={value}
              key={i}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default DivisionButtonList;
