import { calcCurrentTimeMark } from '../utils/calculations';
import { clear, drawCurrentTimeMark } from '../utils/canvas';
import PropTypes from 'prop-types';
import EditorCanvas from './EditorCanvas';

export default class EditorCurrentTimeMarkCanvas extends EditorCanvas {
  updateCanvas(props) {
    const { height, width, bpm, offset, currentTime, scroll } = props;
    clear(this.ctx, width - 1, height);

    const { x, y } = calcCurrentTimeMark(width, bpm, offset, currentTime);
    drawCurrentTimeMark(this.ctx, x, y - scroll);
  }
}

EditorCurrentTimeMarkCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  bpm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currentTime: PropTypes.number.isRequired,
};
