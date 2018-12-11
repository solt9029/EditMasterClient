import React, { Fragment } from 'react';
import PaletteButton from '../components/PaletteButton';
import { Numbers } from '../constants/';
import { calcPaletteButtonColSize } from '../utils/calculations';
import PropTypes from 'prop-types';

const DivisionButtonList = ({ currentDivision, setCurrentDivision, width }) => {
  const size = calcPaletteButtonColSize(width);

  return (
    <Fragment>
      {Numbers.DIVISIONS.map((value, i) => {
        const onClick = () => setCurrentDivision(value);
        return (
          <PaletteButton
            active={currentDivision === value}
            onClick={onClick}
            size={size}
            value={value}
            key={i}
          />
        );
      })}
    </Fragment>
  );
};

export default DivisionButtonList;

DivisionButtonList.propTypes = {
  currentDivision: PropTypes.number.isRequired,
  setCurrentDivision: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
