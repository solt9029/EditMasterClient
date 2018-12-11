import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PaletteButton from './PaletteButton';

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const NoteButton = ({ value, src, color, active, size, label, onClick }) => {
  return (
    <PaletteButton
      color={color}
      active={active}
      value={value}
      onClick={onClick}
      size={size}
      label={label}
    >
      <Img src={src} alt={label} />
    </PaletteButton>
  );
};

export default NoteButton;

NoteButton.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
  value: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};
