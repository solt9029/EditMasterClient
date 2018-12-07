import { Numbers, Ids, Percentages } from '../constants';
import {
  calcInitialNoteX,
  calcNoteIndexRangeInCanvas,
} from '../utils/calculations';
import { clear, drawNote, drawBarStartLine } from '../utils/canvas';
import propTypes from 'prop-types';
import PlayerCanvas from './PlayerCanvas';

export default class PlayerNotesCanvas extends PlayerCanvas {
  updateCanvas() {
    const {
      speed,
      bpm,
      offset,
      width,
      height,
      currentTime,
      notes,
      states,
    } = this.props;

    const spaceWidth = speed * Percentages.PLAYER.SPEED_TO_SPACE_WIDTH;

    clear(this.ctx, width, height);

    const initialNoteX = calcInitialNoteX(currentTime, bpm, offset, speed);
    const canvasRange = calcNoteIndexRangeInCanvas(
      notes.length,
      speed,
      width,
      initialNoteX
    );
    if (!canvasRange) {
      return;
    }

    // bar start lines
    const initialBarStartLineIndex =
      canvasRange[0] - (canvasRange[0] % Numbers.NOTES_PER_BAR);
    for (
      let i = initialBarStartLineIndex;
      i <= canvasRange[1];
      i += Numbers.NOTES_PER_BAR
    ) {
      const x = initialNoteX + i * spaceWidth;
      drawBarStartLine(this.ctx, x, height - 1);
    }

    // notes
    for (let i = canvasRange[1]; i >= canvasRange[0]; i--) {
      const note = notes[i];
      const state = states[i];
      if (state !== Ids.STATE.FRESH || note === Ids.NOTE.SPACE) {
        continue;
      }

      const x = initialNoteX + i * spaceWidth;
      const y = (height - 1) / 2;
      const previousNote = i > 0 ? notes[i - 1] : Ids.NOTE.SPACE;
      const nextNote = i < notes.length - 1 ? notes[i + 1] : Ids.NOTE.SPACE;

      drawNote(
        this.ctx,
        x,
        y,
        'PLAYER',
        note,
        spaceWidth,
        previousNote,
        nextNote
      );
    }
  }
}

PlayerNotesCanvas.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  bpm: propTypes.number.isRequired,
  speed: propTypes.number.isRequired,
  offset: propTypes.number.isRequired,
  currentTime: propTypes.number.isRequired,
  notes: propTypes.arrayOf(propTypes.number).isRequired,
  states: propTypes.arrayOf(propTypes.number).isRequired,
};
