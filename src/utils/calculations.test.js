import calculations from './calculations';
import { seconds } from '../constants/';

describe('calculations', () => {
  it('secondsPerNote(240) to be 1 / 96', () => {
    expect(calculations.secondsPerNote(240)).toBe(1 / 96);
  });

  it('secondsPerNote(120) not to be 1 / 96', () => {
    expect(calculations.secondsPerNote(120)).not.toBe(1 / 96);
  });

  it('noteIndexRangeInSecondRange(seconds.RANGE.AUTO, 10, 150, 1) to equal [539, 541]', () => {
    expect(
      calculations.noteIndexRangeInSecondRange(seconds.RANGE.AUTO, 10, 150, 1)
    ).toEqual([539, 541]);
  });

  it('initialNoteX(5, 100, 1, 1) to be -430', () => {
    expect(calculations.initialNoteX(5, 100, 1, 1)).toBe(-430);
  });

  it('noteIndexRangeInCanvas(192, 1.5, 500, 3) to equal [0, 113]', () => {
    expect(calculations.noteIndexRangeInCanvas(192, 1.5, 500, 3)).toEqual([
      0,
      113,
    ]);
  });

  it('noteIndexRangeInCanvas(192, 1.5, 1000, 3) to equal [0, 191]', () => {
    expect(calculations.noteIndexRangeInCanvas(192, 1.5, 1000, 3)).toEqual([
      0,
      191,
    ]);
  });

  it('noteIndexRangeInCanvas(192, 5, 500, 3) to equal [0, 36]', () => {
    expect(calculations.noteIndexRangeInCanvas(192, 5, 500, 3)).toEqual([
      0,
      36,
    ]);
  });
});
