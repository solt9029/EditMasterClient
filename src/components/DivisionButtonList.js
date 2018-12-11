import React, { Fragment } from 'react';
import PaletteButton from '../components/PaletteButton';
import { Numbers } from '../constants/';

const DivisionButtonList = ({
  currentDivision,
  setCurrentDivision,
  paletteWidth,
}) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default DivisionButtonList;
