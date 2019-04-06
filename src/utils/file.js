import { Numbers } from '../constants';
import { saveAs } from 'file-saver';
import Ids from '../constants/ids';

/**
 * EXAMPLE: notes = [0, 5, 5, 5, 5, 2]; id = 5; index = 4; this function returns true;
 * @param {Array} notes
 * @param {number} id
 * @param {number} index
 */
const isFinalNote = (notes, id, index) => {
  const prevIndex = index - 1;
  if (prevIndex < 0) {
    return false;
  }
  const nextIndex = index + 1 < notes.length - 1 ? index + 1 : index;
  return (
    notes[index] === id && notes[prevIndex] === id && notes[nextIndex] !== id
  );
};

/**
 *
 * @param {Array} notes
 * @param {number} index
 */
const isFinalRenda = (notes, index) => {
  return (
    isFinalNote(notes, Ids.NOTE.RENDA, index) ||
    isFinalNote(notes, Ids.NOTE.BIGRENDA, index) ||
    isFinalNote(notes, Ids.NOTE.BALLOON, index)
  );
};

/**
 * update final renda note id number to 8.
 * EXAMPLE: 055551 to 055581
 * @param {Array} notes
 * @return {Array}
 */
const fixFinalRenda = notes => {
  const TJA_FINAL_RENDA = 8;
  let newNotes = [...notes];
  for (let i = 1; i < newNotes.length; i++) {
    if (isFinalRenda(newNotes, i)) {
      newNotes[i] = TJA_FINAL_RENDA;
    }
  }
  return newNotes;
};

/**
 *
 * @param {Array} lines
 * @return {string}
 */
const convertLinesToContent = lines => {
  let content = '';
  for (let i = 0; i < lines.length; i++) {
    content += lines[i];
    content += '\n';
  }
  return content;
};

/**
 *
 * @param {Array} notes
 * @param {string} videoId
 * @param {number} bpm
 * @param {number} offset
 * @return {Array}
 */
const createTjaLines = (notes, videoId, bpm, offset) => {
  let lines = [];
  lines.push(`TITLE:${videoId}`);
  lines.push(`BPM:${bpm}`);
  lines.push('WAVE:music.ogg');
  lines.push(`OFFSET:${offset}`);
  lines.push('COURSE:oni');
  lines.push('LEVEL:8');
  lines.push('#START');
  for (let l = 0; l < notes.length / Numbers.NOTES_PER_BAR; l++) {
    let line = '';
    for (let c = 0; c < Numbers.NOTES_PER_BAR; c++) {
      line += notes[l * Numbers.NOTES_PER_BAR + c];
    }
    line += ',';
    lines.push(line);
  }
  lines.push('#END');

  return lines;
};

/**
 *
 * @param {number} offset
 * @return {number}
 */
const fixOffset = offset => {
  return -(parseFloat(offset) + 0.08);
};

/**
 *
 * @param {Array} notes
 * @param {string} videoId
 * @param {number} bpm
 * @param {number} offset
 * @return {Array}
 */
export const exportTja = (notes, videoId, bpm, offset) => {
  const fixedOffset = fixOffset(offset);
  const fixedNotes = fixFinalRenda(notes);

  const lines = createTjaLines(fixedNotes, videoId, bpm, fixedOffset);
  const content = convertLinesToContent(lines);

  const blob = new Blob([content], { type: 'tja/plain' });
  saveAs(blob, `${videoId}.tja`);
};
