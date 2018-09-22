import { color, size, id } from './constants';

export default class Canvas {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear(width, height) {
    this.ctx.clearRect(0, 0, width, height);
  }

  drawNote(
    x,
    y,
    pane,
    noteId,
    previousNoteId = id.note.space,
    nextNoteId = id.note.space,
    spaceWidth = size.player.space.width
  ) {
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

    if (
      noteId === id.note.renda ||
      noteId === id.note.bigrenda ||
      noteId === id.note.balloon
    ) {
      if (noteId === previousNoteId) {
        if (noteId === nextNoteId) {
          // extension
          this.ctx.fillStyle = noteColor;
          this.ctx.fillRect(
            x - spaceWidth / 2 - 1,
            y - size[pane][noteSize].outside,
            spaceWidth + 2,
            size[pane][noteSize].outside * 2
          );
          return;
        }

        // end
        this.ctx.beginPath();
        this.ctx.fillStyle = noteColor;
        this.ctx.strokeStyle = color.black;
        this.ctx.arc(x, y, size[pane][noteSize].outside, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        return;
      }
    }

    // start
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

    return;
  }
}
