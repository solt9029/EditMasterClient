import React from 'react';
import PaletteButton from './PaletteButton';
import propTypes from 'prop-types';

const DivisionButton = ({ currentValue, value, paletteWidth, setValue }) => {
  return (
    <PaletteButton
      currentValue={currentValue}
      value={value}
      setValue={setValue}
      paletteWidth={paletteWidth}
    />
  );
};

export default DivisionButton;

DivisionButton.propTypes = {
  currentValue: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
  setValue: propTypes.func.isRequired,
  paletteWidth: propTypes.number.isRequired,
};
