export default class JudgeEffect {
  limit = 10;

  /**
   *
   * @param {number} state
   * @param {number} playerHeight
   */
  constructor(state, playerHeight) {
    this.state = state;
    this.y = (playerHeight - 1) / 2;
  }

  update() {
    this.limit--;
  }
}
