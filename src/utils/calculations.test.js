import calculations from './calculations';
import { seconds } from '../constants/';

describe('secondsPerNote', () => {
  it('secondsPerNote(240) to be 1 / 96', () => {
    expect(calculations.secondsPerNote(240)).toBe(1 / 96);
  });
  it('secondsPerNote(120) not to be 1 / 96', () => {
    expect(calculations.secondsPerNote(120)).not.toBe(1 / 96);
  });
});

describe('noteIndexRangeInSecondRange', () => {
  it('noteIndexRangeInSecondRange(seconds.RANGE.AUTO, 10, 150, 1)', () => {
    expect(
      calculations.noteIndexRangeInSecondRange(seconds.RANGE.AUTO, 10, 150, 1)
    ).toEqual([539, 541]);
  });
});

describe('initialNoteX', () => {
  it('initialNoteX(5, 100, 1, 1) to be -430', () => {
    expect(calculations.initialNoteX(5, 100, 1, 1)).toBe(-430);
  });
});

describe('noteIndexRangeInCanvas', () => {
  it('noteIndexRangeInCanvas(192, 1.5, 500, 3)', () => {
    expect(calculations.noteIndexRangeInCanvas(192, 1.5, 500, 3)).toEqual([
      0,
      113,
    ]);
  });
  it('noteIndexRangeInCanvas(192, 1.5, 1000, 3)', () => {
    expect(calculations.noteIndexRangeInCanvas(192, 1.5, 1000, 3)).toEqual([
      0,
      191,
    ]);
  });
  it('noteIndexRangeInCanvas(192, 5, 500, 3)', () => {
    expect(calculations.noteIndexRangeInCanvas(192, 5, 500, 3)).toEqual([
      0,
      36,
    ]);
  });
});
