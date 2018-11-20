import React from 'react';
import { Row, Container } from 'reactstrap';
import styled from 'styled-components';
import NoteButton from '../containers/NoteButton';
import { ids } from '../constants';

const StyledContainer = styled(Container)`
  margin-bottom: 30px;
`;

const NoteButtonList = () => {
  return (
    <StyledContainer>
      <Row>
        <NoteButton
          img="/images/don.png"
          color="danger"
          label="ドン"
          value={ids.NOTE.DON}
        />
        <NoteButton
          img="/images/ka.png"
          color="primary"
          label="カッ"
          value={ids.NOTE.KA}
        />
        <NoteButton
          img="/images/bigdon.png"
          color="danger"
          label="大ドン"
          value={ids.NOTE.BIGDON}
        />
        <NoteButton
          img="/images/bigka.png"
          color="primary"
          label="大カッ"
          value={ids.NOTE.BIGKA}
        />
        <NoteButton
          img="/images/renda.png"
          color="warning"
          label="連打"
          value={ids.NOTE.RENDA}
        />
        <NoteButton
          img="/images/bigrenda.png"
          color="warning"
          label="大連打"
          value={ids.NOTE.BIGRENDA}
        />
        <NoteButton
          img="/images/balloon.png"
          color="danger"
          label="風船"
          value={ids.NOTE.BALLOON}
        />
        <NoteButton
          img="/images/space.png"
          color="light"
          label="空白"
          value={ids.NOTE.SPACE}
        />
      </Row>
    </StyledContainer>
  );
};

export default NoteButtonList;
