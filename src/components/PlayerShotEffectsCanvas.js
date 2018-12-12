import { clear, drawNote } from '../utils/canvas';
import PropTypes from 'prop-types';
import PlayerCanvas from './PlayerCanvas';

export default class PlayerShotEffectsCanvas extends PlayerCanvas {
  updateCanvas(props) {
    const { width, height, shots } = props;
    clear(this.ctx, width, height);
    for (let i = shots.length - 1; i >= 0; i--) {
      drawNote(this.ctx, shots[i].x, shots[i].y, 'PLAYER', shots[i].note);
    }
  }
}

PlayerShotEffectsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shots: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
