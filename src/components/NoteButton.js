import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import PaletteButton from './PaletteButton';

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const NoteButton = ({
  value,
  src,
  color,
  active,
  paletteWidth,
  label,
  setValue,
}) => {
  return (
    <PaletteButton
      color={color}
      active={active}
      value={value}
      setValue={setValue}
      paletteWidth={paletteWidth}
      label={label}
    >
      <Img src={src} alt={label} />
    </PaletteButton>
  );
};

export default NoteButton;

NoteButton.propTypes = {
  src: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  setValue: propTypes.func.isRequired,
  color: propTypes.string.isRequired,
  active: propTypes.bool,
  value: propTypes.number.isRequired,
  paletteWidth: propTypes.number.isRequired,
};
