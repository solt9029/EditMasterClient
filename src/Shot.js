import { position } from './constants';

export default class Shot {
  constructor(y, id) {
    this.id = id;
    this.x = position.player.judge.x;
    this.y = y;
    this.g = 1;

    this.limit = 5;
  }
  move(x, y) {
    this.x += x;
    this.y -= y / this.g;
    this.g += 0.1;
    this.limit--;
  }
}
