export default class Shot {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.g = 1;

    this.limit = 10;
  }
  move(x, y) {
    this.x += x;
    this.y -= y / this.g;
    this.g += 0.1;
    this.limit--;
  }
}
