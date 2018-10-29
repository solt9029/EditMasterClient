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

export const noteIndexRangeInCanvas = (
  notesLength,
  speed,
  width,
  initialNoteX
) => {
  const spaceWidth = speed * percentages.PLAYER.SPEED_TO_SPACE_WIDTH;
  let initialNoteIndex = Math.floor(-initialNoteX / spaceWidth) - 3; // Math.floor(-initialNoteX / spaceWidth) is the number of notes that already passed from canvas
  const notesNumber = Math.ceil((width - 1) / spaceWidth); // the number of notes that canvas can display in it
  let finalNoteIndex = initialNoteIndex + notesNumber + 6;

  if (initialNoteIndex < 0) {
    initialNoteIndex = 0;
  }
  if (initialNoteIndex >= notesLength) {
    return null;
  }

  if (finalNoteIndex < 0) {
    return null;
  }
  if (finalNoteIndex >= notesLength) {
    finalNoteIndex = notesLength - 1;
  }

  return [initialNoteIndex, finalNoteIndex];
};

export default {
  secondsPerNote,
  noteIndexRangeInSecondRange,
  initialNoteX,
  noteIndexRangeInCanvas,
};
