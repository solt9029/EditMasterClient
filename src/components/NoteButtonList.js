import React, { Fragment } from 'react';
import NoteButton from '../components/NoteButton';
import { Ids } from '../constants';
import { calcPaletteButtonColSize } from '../utils/calculations';

const notes = [
  {
    src: '/images/don.png',
    color: 'danger',
    label: 'ドン',
    value: Ids.NOTE.DON,
  },
  {
    src: '/images/ka.png',
    color: 'primary',
    label: 'カッ',
    value: Ids.NOTE.KA,
  },
  {
    src: '/images/bigdon.png',
    color: 'danger',
    label: '大ドン',
    value: Ids.NOTE.BIGDON,
  },
  {
    src: '/images/bigka.png',
    color: 'primary',
    label: '大カッ',
    value: Ids.NOTE.BIGKA,
  },
  {
    src: '/images/renda.png',
    color: 'warning',
    label: '連打',
    value: Ids.NOTE.RENDA,
  },
  {
    src: '/images/bigrenda.png',
    color: 'warning',
    label: '大連打',
    value: Ids.NOTE.BIGRENDA,
  },
  {
    src: '/images/balloon.png',
    color: 'danger',
    label: '風船',
    value: Ids.NOTE.BALLOON,
  },
  {
    src: '/images/space.png',
    color: 'light',
    label: '空白',
    value: Ids.NOTE.SPACE,
  },
];

const NoteButtonList = ({ currentNote, setCurrentNote, width }) => {
  const size = calcPaletteButtonColSize(width);

  return (
    <Fragment>
      {notes.map((note, i) => {
        const { src, color, label, value } = note;
        const onClick = () => setCurrentNote(value);

        return (
          <NoteButton
            src={src}
            color={color}
            label={label}
            value={value}
            active={value === currentNote}
            onClick={onClick}
            size={size}
            key={i}
          />
        );
      })}
    </Fragment>
  );
};

export default NoteButtonList;
