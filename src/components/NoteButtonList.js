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
          src="/images/don.png"
          color="danger"
          label="ドン"
          value={ids.NOTE.DON}
        />
        <NoteButton
          src="/images/ka.png"
          color="primary"
          label="カッ"
          value={ids.NOTE.KA}
        />
        <NoteButton
          src="/images/bigdon.png"
          color="danger"
          label="大ドン"
          value={ids.NOTE.BIGDON}
        />
        <NoteButton
          src="/images/bigka.png"
          color="primary"
          label="大カッ"
          value={ids.NOTE.BIGKA}
        />
        <NoteButton
          src="/images/renda.png"
          color="warning"
          label="連打"
          value={ids.NOTE.RENDA}
        />
        <NoteButton
          src="/images/bigrenda.png"
          color="warning"
          label="大連打"
          value={ids.NOTE.BIGRENDA}
        />
        <NoteButton
          src="/images/balloon.png"
          color="danger"
          label="風船"
          value={ids.NOTE.BALLOON}
        />
        <NoteButton
          src="/images/space.png"
          color="light"
          label="空白"
          value={ids.NOTE.SPACE}
        />
      </Row>
    </StyledContainer>
  );
};

export default NoteButtonList;
