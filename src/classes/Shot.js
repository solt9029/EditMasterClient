import { Positions } from '../constants/';

export default class Shot {
  x = Positions.PLAYER.JUDGE.X;
  g = 1;
  limit = 5;

  /**
   *
   * @param {number} note
   * @param {number} playerWidth
   * @param {number} playerHeight
   */
  constructor(note, playerWidth, playerHeight) {
    this.note = note;
    this.playerWidth = playerWidth;
    this.playerHeight = playerHeight;
    this.y = (playerHeight - 1) / 2;
  }

  update() {
    this.x += this.playerWidth / 100;
    this.y -= this.playerHeight / 10 / this.g;
    this.g += 0.1;
    this.limit--;
  }
}
