export default class Shot {
  constructor(x, y, size, color) {
    this.color = color;
    this.size = size;
    this.x = x;
    this.y = y;
    this.g = 1;

    this.limit = 20;
  }
  move(x, y) {
    this.x += x;
    this.y += y * this.g;
    this.g += 0.1;
    this.limit--;
  }
}
