import { numbers } from '../constants';
import { saveAs } from 'file-saver';

export const exportFile = (notes, videoId, bpm, offset) => {
  const fixedOffset = -(parseFloat(offset) + 0.08);

  let line = [];
  line[0] = `TITLE:${videoId}`;
  line[1] = `BPM:${bpm}`;
  line[2] = 'WAVE:music.ogg';
  line[3] = `OFFSET:${fixedOffset}`;
  line[4] = 'COURSE:oni';
  line[5] = 'LEVEL:8';
  line[6] = '#START';

  for (let l = 0; l < notes.length / numbers.NOTES_PER_BAR; l++) {
    line[7 + l] = '';
    for (let c = 0; c < numbers.NOTES_PER_BAR; c++) {
      line[7 + l] += notes[l * numbers.NOTES_PER_BAR + c];
    }
    line[7 + l] += ',';
  }
  line[7 + notes.length / numbers.NOTES_PER_BAR] = '#END';

  let content = '';
  for (let i = 0; i < line.length; i++) {
    content += line[i];
    content += '\n';
  }
  const blob = new Blob([content], { type: 'tja/plain' });
  saveAs(blob, `${videoId}.tja`);
};

export default {
  exportFile,
};
