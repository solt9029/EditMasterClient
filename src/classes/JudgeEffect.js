import { Sizes } from '../constants/';

export default class JudgeEffect {
  constructor(y, stateId) {
    this.judgeMarkY = y;
    this.judgeTextY = y - Sizes.PLAYER.NORMAL.OUTSIDE;
    this.g = 1;
    this.stateId = stateId;
    this.limit = 10;
  }

  move(y) {
    this.judgeTextY -= y / this.g;
    this.g += 0.4;
    this.limit--;
  }
}
