import { clear, drawJudgeEffect } from '../utils/canvas';
import PropTypes from 'prop-types';
import PlayerCanvas from './PlayerCanvas';

export default class PlayerJudgeEffectsCanvas extends PlayerCanvas {
  updateCanvas() {
    const { width, height, judgeEffects } = this.props;
    clear(this.ctx, width, height);
    for (let i = judgeEffects.length - 1; i >= 0; i--) {
      drawJudgeEffect(this.ctx, judgeEffects[i].y, judgeEffects[i].state);
    }
  }
}

PlayerJudgeEffectsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  judgeEffects: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
