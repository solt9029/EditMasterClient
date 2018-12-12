import { clear, drawFireworkEffect } from '../utils/canvas';
import PropTypes from 'prop-types';
import PlayerCanvas from './PlayerCanvas';

export default class PlayerFireworkEffectsCanvas extends PlayerCanvas {
  updateCanvas(props) {
    const { width, height, fireworkEffects } = props;
    clear(this.ctx, width, height);
    for (let i = fireworkEffects.length - 1; i >= 0; i--) {
      drawFireworkEffect(
        this.ctx,
        fireworkEffects[i].y,
        fireworkEffects[i].state
      );
    }
  }
}

PlayerFireworkEffectsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fireworkEffects: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
