import {
  calcSecondsPerNote,
  calcNoteIndexRangeInSecondRange,
  calcInitialNoteX,
  calcNoteIndexRangeInCanvas,
} from './calculations';
import { Seconds } from '../constants/';

describe('calculations', () => {
  test('calcSecondsPerNote(240) to be 1 / 96', () => {
    expect(calcSecondsPerNote(240)).toBe(1 / 96);
  });

  test('calcSecondsPerNote(120) not to be 1 / 96', () => {
    expect(calcSecondsPerNote(120)).not.toBe(1 / 96);
  });

  test('calcNoteIndexRangeInSecondRange(seconds.RANGE.AUTO, 10, 150, 1) to equal [539, 541]', () => {
    expect(
      calcNoteIndexRangeInSecondRange(Seconds.RANGE.AUTO, 10, 150, 1)
    ).toEqual([539, 541]);
  });

  test('calcInitialNoteX(5, 100, 1, 1) to be -430', () => {
    expect(calcInitialNoteX(5, 100, 1, 1)).toBe(-430);
  });

  test('calcNoteIndexRangeInCanvas(192, 1.5, 500, 3) to equal [0, 113]', () => {
    expect(calcNoteIndexRangeInCanvas(192, 1.5, 500, 3)).toEqual([0, 113]);
  });

  test('calcNoteIndexRangeInCanvas(192, 1.5, 1000, 3) to equal [0, 191]', () => {
    expect(calcNoteIndexRangeInCanvas(192, 1.5, 1000, 3)).toEqual([0, 191]);
  });

  test('calcNoteIndexRangeInCanvas(192, 5, 500, 3) to equal [0, 36]', () => {
    expect(calcNoteIndexRangeInCanvas(192, 5, 500, 3)).toEqual([0, 36]);
  });
});
