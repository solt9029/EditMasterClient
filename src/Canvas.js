import { color, size, id } from './constants';

export default class Canvas {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear(width, height) {
    this.ctx.clearRect(0, 0, width, height);
  }

  drawNote(x, y, pane, noteId) {
    let noteSize = 'normal';
    let noteColor = color.red;

    switch (noteId) {
      case id.note.ka:
        noteColor = color.blue;
        break;
      case id.note.bigdon:
        noteSize = 'big';
        break;
      case id.note.bigka:
        noteSize = 'big';
        noteColor = color.blue;
        break;
      case id.note.renda:
        noteColor = color.yellow;
        break;
      case id.note.bigrenda:
        noteColor = color.yellow;
        noteSize = 'big';
        break;
      default:
        break;
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = color.white;
    this.ctx.strokeStyle = color.black;
    this.ctx.arc(x, y, size[pane][noteSize].outside, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = noteColor;
    this.ctx.arc(x, y, size[pane][noteSize].inside, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
