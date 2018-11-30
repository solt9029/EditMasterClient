import { Numbers, Percentages, Positions, Sizes } from '../constants/';

/**
 *
 * @param {number} bpm
 * @return {number}
 */
export const calcSecondsPerNote = bpm => {
  const barPerMinute = bpm / Numbers.BEAT;
  const barPerSecond = barPerMinute / 60;
  const notesPerSecond = barPerSecond * Numbers.NOTES_PER_BAR;
  const secondsPerNote = 1 / notesPerSecond;
  return secondsPerNote;
};

export const calcNoteIndexRangeInSecondRange = (
  secondRange,
  currentTime,
  bpm,
  offset
) => {
  const initialNoteIndex = Math.ceil(
    (currentTime - secondRange - offset) / calcSecondsPerNote(bpm)
  );
  const finalNoteIndex = Math.floor(
    (currentTime + secondRange - offset) / calcSecondsPerNote(bpm)
  );
  return [initialNoteIndex, finalNoteIndex];
};

/**
 *
 * @param {number} currentTime
 * @param {number} bpm
 * @param {number} offset
 * @param {number} speed
 * @return {number}
 */
export const calcInitialNoteX = (currentTime, bpm, offset, speed) => {
  const spaceWidth = speed * Percentages.PLAYER.SPEED_TO_SPACE_WIDTH;
  const initialNoteX =
    Positions.PLAYER.JUDGE.X +
    ((offset - currentTime) / calcSecondsPerNote(bpm)) * spaceWidth;
  return initialNoteX;
};

export const calcNoteIndexRangeInCanvas = (
  notesLength,
  speed,
  width,
  initialNoteX
) => {
  const spaceWidth = speed * Percentages.PLAYER.SPEED_TO_SPACE_WIDTH;
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

export const calcCaret = (mouseX, mouseY, width, division) => {
  const barWidth = width - 1 - Positions.EDITOR.BAR.X * 2;
  const actualBarWidth = barWidth * (1 - Percentages.EDITOR.BAR_START_LINE); // left side of initial beat line is not available
  const barStartLineX =
    Positions.EDITOR.BAR.X + barWidth * Percentages.EDITOR.BAR_START_LINE;
  let divisionIndex = Math.round(
    (mouseX - barStartLineX) /
      ((barWidth * (1 - Percentages.EDITOR.BAR_START_LINE)) / division)
  );
  if (divisionIndex < 0) {
    divisionIndex = 0;
  }
  if (divisionIndex >= division) {
    divisionIndex = division - 1;
  }

  const barIndex = Math.floor(mouseY / Sizes.EDITOR.BAR.OUTSIDE.HEIGHT);

  const x =
    barStartLineX +
    actualBarWidth * (divisionIndex / division) -
    Sizes.EDITOR.CARET.WIDTH / 2;

  const y =
    barIndex * Sizes.EDITOR.BAR.OUTSIDE.HEIGHT +
    (Sizes.EDITOR.BAR.OUTSIDE.HEIGHT - Sizes.EDITOR.BAR.INSIDE.HEIGHT) / 2;

  return { x, y, divisionIndex, barIndex };
};

/**
 *
 * @param {number} notesLength
 * @return {number}
 */
export const calcEditorCanvasHeight = notesLength => {
  return (
    Math.ceil(notesLength / Numbers.NOTES_PER_BAR) *
    Sizes.EDITOR.BAR.OUTSIDE.HEIGHT
  );
};

export const calcBarWidth = width => {
  return width - 1 - Positions.EDITOR.BAR.X * 2;
};

export const calcCurrentTimeMark = (width, bpm, offset, currentTime) => {
  const barWidth = calcBarWidth(width);
  const actualBarWidth = barWidth * (1 - Percentages.EDITOR.BAR_START_LINE); // left side of initial beat line is not available
  const spaceWidth = actualBarWidth / Numbers.NOTES_PER_BAR;

  const currentNoteIndexFloat =
    (currentTime - offset) / calcSecondsPerNote(bpm);
  const currentNotesPerBarIndexFloat =
    currentNoteIndexFloat % Numbers.NOTES_PER_BAR;
  const currentBarIndex = Math.floor(
    currentNoteIndexFloat / Numbers.NOTES_PER_BAR
  );

  const y =
    currentBarIndex * Sizes.EDITOR.BAR.OUTSIDE.HEIGHT +
    (Sizes.EDITOR.BAR.OUTSIDE.HEIGHT - Sizes.EDITOR.BAR.INSIDE.HEIGHT) / 2;
  const x = currentNotesPerBarIndexFloat * spaceWidth;

  return { x, y };
};

/**
 *
 * @param {number} notesLength
 * @return {number}
 */
export const calcBarNum = notesLength => {
  return Math.ceil(notesLength / Numbers.NOTES_PER_BAR);
};
