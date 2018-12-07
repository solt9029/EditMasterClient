import { clear, drawBackgroundEffect } from '../utils/canvas';
import PlayerCanvas from './PlayerCanvas';
import PropTypes from 'prop-types';

export default class PlayerBackgroundEffectsCanvas extends PlayerCanvas {
  updateCanvas() {
    const { width, height, backgroundEffects } = this.props;
    clear(this.ctx, width, height);
    for (let i = backgroundEffects.length - 1; i >= 0; i--) {
      drawBackgroundEffect(
        this.ctx,
        backgroundEffects[i].isDon,
        backgroundEffects[i].playerWidth,
        backgroundEffects[i].playerHeight
      );
    }
  }
}

PlayerBackgroundEffectsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundEffects: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
