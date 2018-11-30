import { Sizes } from '../constants/';

export default class JudgeEffect {
  g = 1;
  limit = 10;

  constructor(y, state) {
    this.judgeMarkY = y;
    this.judgeTextY = y - Sizes.PLAYER.NORMAL.OUTSIDE;
    this.state = state;
  }

  move(y) {
    this.judgeTextY -= y / this.g;
    this.g += 0.4;
    this.limit--;
  }
}
