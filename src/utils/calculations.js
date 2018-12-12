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

/**
 *
 * @param {number} secondRange
 * @param {number} currentTime
 * @param {number} bpm
 * @param {number} offset
 */
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

/**
 *
 * @param {number} notesLength
 * @param {number} scroll
 * @param {number} height
 */
export const calcNoteIndexRangeInEditorCanvas = (
  notesLength,
  scroll,
  height
) => {
  const firstBarIndex = Math.floor(scroll / Sizes.EDITOR.BAR.OUTSIDE.HEIGHT);
  const lastBarIndex = Math.ceil(
    (scroll + height) / Sizes.EDITOR.BAR.OUTSIDE.HEIGHT
  );
  const firstNoteIndex = firstBarIndex * Numbers.NOTES_PER_BAR;
  let lastNoteIndex = lastBarIndex * Numbers.NOTES_PER_BAR - 1;
  if (lastNoteIndex >= notesLength) {
    lastNoteIndex = notesLength - 1;
  }
  return [firstNoteIndex, lastNoteIndex];
};

/**
 * TODO: change func name to calcBarIndexRangeInEditorCanvas.
 * @param {number} barNum
 * @param {number} scroll
 * @param {number} height
 */
export const calcBarIndexRangeInCanvas = (barNum, scroll, height) => {
  const firstBarIndex = Math.floor(scroll / Sizes.EDITOR.BAR.OUTSIDE.HEIGHT);
  let lastBarIndex = Math.ceil(
    (scroll + height) / Sizes.EDITOR.BAR.OUTSIDE.HEIGHT
  );
  if (lastBarIndex >= barNum) {
    lastBarIndex = barNum - 1;
  }
  return [firstBarIndex, lastBarIndex];
};

/**
 * TODO: change func name to calcNoteIndexRangeInPlayerCanvas.
 * @param {number} notesLength
 * @param {number} speed
 * @param {number} width
 * @param {number} initialNoteX
 */
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

/**
 *
 * @param {number} mouseX
 * @param {number} mouseY
 * @param {number} width
 * @param {number} division
 */
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

/**
 *
 * @param {number} width
 */
export const calcBarWidth = width => {
  return width - 1 - Positions.EDITOR.BAR.X * 2;
};

/**
 *
 * @param {number} width
 * @param {number} bpm
 * @param {number} offset
 * @param {number} currentTime
 */
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

/**
 *
 * @param {Array} beats
 */
export const calcSongle = beats => {
  const offset = beats[0].start / 1000;
  let bpmSum = 0;
  for (let i = 30; i < beats.length - 30; i++) {
    bpmSum += beats[i].bpm;
  }
  const bpm = bpmSum / (beats.length - 60);
  return { bpm, offset };
};

/**
 *
 * @param {number} width the width of palette pane.
 */
export const calcPaletteButtonColSize = width => {
  let size = 3;
  if (width < 200) {
    size = 12;
  } else if (width < 360) {
    size = 6;
  }
  return size;
};
