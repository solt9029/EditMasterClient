import { Sizes } from '../constants/';

export default class JudgeEffect {
  g = 1;
  limit = 10;

  /**
   *
   * @param {number} state
   * @param {number} playerHeight
   */
  constructor(state, playerHeight) {
    this.state = state;
    this.playerHeight = playerHeight;
    this.y = (playerHeight - 1) / 2 - Sizes.PLAYER.NORMAL.OUTSIDE;
  }

  update() {
    this.y -= this.playerHeight / 50 / this.g;
    this.g += 0.4;
    this.limit--;
  }
}
