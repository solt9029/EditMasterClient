import { Positions } from '../constants/';

export default class Shot {
  x = Positions.PLAYER.JUDGE.X;
  g = 1;
  limit = 5;

  constructor(y, note) {
    this.note = note;
    this.y = y;
  }

  move(x, y) {
    this.x += x;
    this.y -= y / this.g;
    this.g += 0.1;
    this.limit--;
  }
}
