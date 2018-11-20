import React from 'react';
import PaletteButton from './PaletteButton';
import propTypes from 'prop-types';

const DivisionButton = props => {
  const { currentDivision, value, paletteWidth } = props;

  const setDivision = () => {
    props.setDivision(value);
  };

  return (
    <PaletteButton
      currentValue={currentDivision}
      value={value}
      onClick={setDivision}
      paletteWidth={paletteWidth}
    />
  );
};

export default DivisionButton;

DivisionButton.propTypes = {
  currentDivision: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
  setDivision: propTypes.func.isRequired,
  paletteWidth: propTypes.number.isRequired,
};
