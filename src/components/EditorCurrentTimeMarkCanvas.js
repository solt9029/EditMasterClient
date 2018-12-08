import {
  calcEditorCanvasHeight,
  calcCurrentTimeMark,
} from '../utils/calculations';
import { clear, drawCurrentTimeMark } from '../utils/canvas';
import PropTypes from 'prop-types';
import EditorCanvas from './EditorCanvas';

export default class EditorCurrentTimeMarkCanvas extends EditorCanvas {
  updateCanvas() {
    const { notesLength, width, bpm, offset, currentTime } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const { x, y } = calcCurrentTimeMark(width, bpm, offset, currentTime);
    drawCurrentTimeMark(this.ctx, x, y);
  }
}

EditorCurrentTimeMarkCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  notesLength: PropTypes.number.isRequired,
  bpm: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
};
