import { clear, drawNote } from '../utils/canvas';
import PropTypes from 'prop-types';
import PlayerCanvas from './PlayerCanvas';

export default class PlayerShotsCanvas extends PlayerCanvas {
  updateCanvas() {
    const { width, height, shots } = this.props;
    clear(this.ctx, width, height);
    for (let i = shots.length - 1; i >= 0; i--) {
      drawNote(this.ctx, shots[i].x, shots[i].y, 'PLAYER', shots[i].note);
    }
  }
}

PlayerShotsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shots: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
