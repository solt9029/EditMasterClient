import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import PaletteButton from './PaletteButton';

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const NoteButton = props => {
  const { value, img, color, currentNote, paletteWidth, label } = props;

  const setNote = () => {
    props.setNote(value);
  };

  return (
    <PaletteButton
      color={color}
      currentValue={currentNote}
      value={value}
      onClick={setNote}
      paletteWidth={paletteWidth}
      label={label}
    >
      <Img src={img} alt={img} />
    </PaletteButton>
  );
};

export default NoteButton;

NoteButton.propTypes = {
  img: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  setNote: propTypes.func.isRequired,
  color: propTypes.string.isRequired,
  currentNote: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
  paletteWidth: propTypes.number.isRequired,
};
