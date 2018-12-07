import { clear, drawJudgeMark } from '../utils/canvas';
import propTypes from 'prop-types';
import PlayerCanvas from './PlayerCanvas';

export default class PlayerJudgeMarkCanvas extends PlayerCanvas {
  updateCanvas() {
    const { width, height } = this.props;
    clear(this.ctx, width, height);
    drawJudgeMark(this.ctx, (height - 1) / 2);
  }
}

PlayerJudgeMarkCanvas.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
};
