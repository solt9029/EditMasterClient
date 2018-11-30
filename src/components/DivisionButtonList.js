import React from 'react';
import { Row } from 'reactstrap';
import PaletteButton from '../components/PaletteButton';
import { Numbers } from '../constants/';
import Container from '../styled/Container';

const DivisionButtonList = ({ currentValue, setValue, paletteWidth }) => {
  return (
    <Container bottom={30}>
      <Row>
        {Numbers.DIVISIONS.map((value, i) => {
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
    </Container>
  );
};

export default DivisionButtonList;
