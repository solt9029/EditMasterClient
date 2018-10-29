import { numbers } from '../constants/';

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

export default {
  secondsPerNote,
  noteIndexRangeInSecondRange,
};
