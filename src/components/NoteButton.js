import React from 'react';
import { Button, Col } from 'reactstrap';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

const StyledCol = styled(Col)`
  && {
    padding: 3px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const NoteButton = props => {
  const { currentNote, value, paletteWidth, label, img, color } = props;

  // recalculate col size
  let size = 3;
  if (paletteWidth < 200) {
    size = 12;
  } else if (paletteWidth < 360) {
    size = 6;
  }

  const setNote = () => {
    props.setNote(value);
  };

  return (
    <StyledCol xs={size} className="btn-group-toggle">
      <StyledButton
        block
        color={color}
        active={currentNote === value}
        onClick={setNote}
      >
        <div>{label}</div>
        <Img src={img} alt={img} />
      </StyledButton>
    </StyledCol>
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
