import React from 'react';
import { Row, Container } from 'reactstrap';
import styled from 'styled-components';
import NoteButton from '../components/NoteButton';
import { ids } from '../constants';

const StyledContainer = styled(Container)`
  margin-bottom: 30px;
`;

const notes = [
  {
    src: '/images/don.png',
    color: 'danger',
    label: 'ドン',
    value: ids.NOTE.DON,
  },
  {
    src: '/images/ka.png',
    color: 'primary',
    label: 'カッ',
    value: ids.NOTE.KA,
  },
  {
    src: '/images/bigdon.png',
    color: 'danger',
    label: '大ドン',
    value: ids.NOTE.BIGDON,
  },
  {
    src: '/images/bigka.png',
    color: 'primary',
    label: '大カッ',
    value: ids.NOTE.BIGKA,
  },
  {
    src: '/images/renda.png',
    color: 'warning',
    label: '連打',
    value: ids.NOTE.RENDA,
  },
  {
    src: '/images/bigrenda.png',
    color: 'warning',
    label: '大連打',
    value: ids.NOTE.BIGRENDA,
  },
  {
    src: '/images/balloon.png',
    color: 'danger',
    label: '風船',
    value: ids.NOTE.BALLOON,
  },
  {
    src: '/images/space.png',
    color: 'light',
    label: '空白',
    value: ids.NOTE.SPACE,
  },
];

const NoteButtonList = ({ currentValue, setValue, paletteWidth }) => {
  return (
    <StyledContainer>
      <Row>
        {notes.map((note, i) => {
          const { src, color, label, value } = note;
          return (
            <NoteButton
              src={src}
              color={color}
              label={label}
              value={value}
              active={value === currentValue}
              setValue={setValue}
              paletteWidth={paletteWidth}
              key={i}
            />
          );
        })}
      </Row>
    </StyledContainer>
  );
};

export default NoteButtonList;
