import { numbers, percentages, positions } from '../constants/';

export const secondsPerNote = bpm => {
  const barPerMinute = bpm / numbers.BEAT;
  const barPerSecond = barPerMinute / 60;
  const notesPerSecond = barPerSecond * numbers.NOTES_PER_BAR;
  const secondsPerNote = 1 / notesPerSecond;
  return secondsPerNote;
};

export const noteIndexRangeInSecondRange = (
  secondRange,
  currentTime,
  bpm,
  offset
) => {
  const initialNoteIndex = Math.ceil(
    (currentTime - secondRange - offset) / secondsPerNote(bpm)
  );
  const finalNoteIndex = Math.floor(
    (currentTime + secondRange - offset) / secondsPerNote(bpm)
  );
  return [initialNoteIndex, finalNoteIndex];
};

export const initialNoteX = (currentTime, bpm, offset, speed) => {
  const spaceWidth = speed * percentages.PLAYER.SPEED_TO_SPACE_WIDTH;
  const initialNoteX =
    positions.PLAYER.JUDGE.X +
    ((offset - currentTime) / secondsPerNote(bpm)) * spaceWidth;
  return initialNoteX;
};

export default {
  secondsPerNote,
  noteIndexRangeInSecondRange,
  initialNoteX,
};
