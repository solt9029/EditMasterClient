export default class BackgroundEffect {
  limit = 10;

  /**
   *
   * @param {boolean} isDon
   * @param {number} playerHeight
   */
  constructor(isDon, playerWidth, playerHeight) {
    this.isDon = isDon;
    this.playerWidth = playerWidth;
    this.playerHeight = playerHeight;
  }

  update() {
    this.limit--;
  }
}
