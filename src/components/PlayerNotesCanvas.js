import React, { Component } from 'react';
import { Numbers, Ids, Percentages } from '../constants';
import {
  calcInitialNoteX,
  calcNoteIndexRangeInCanvas,
} from '../utils/calculations';
import { clear, drawNote, drawBarStartLine } from '../utils/canvas';
import Layer from '../styled/Layer';
import propTypes from 'prop-types';

export default class PlayerNotesCanvas extends Component {
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width === nextProps.height &&
      this.props.height === nextProps.height
    ) {
      this.updateCanvas();
      return false;
    }
    return true;
  }

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

    clear(this.ctx, width - 1, height - 1);

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

  render() {
    const { width, height } = this.props;

    return (
      <Layer innerRef={this.canvasRef} width={width - 1} height={height - 1} />
    );
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
