import { color, size, id, position, number, percentage } from './constants';

export default class Canvas {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear(width, height) {
    this.ctx.clearRect(0, 0, width, height);
    return;
  }

  drawCaret(x, y) {
    this.ctx.fillStyle = color.yellow;
    this.ctx.fillRect(
      x - size.editor.caret.width / 2,
      y - 2,
      size.editor.caret.width,
      size.editor.bar.inside.height + 4
    );
    return;
  }

  drawJudgeMark(y) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color.white;
    this.ctx.arc(
      position.player.judge.x,
      y,
      size.player.normal.outside,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
    return;
  }

  drawBar(x, y, width) {
    const insideY =
      y + (size.editor.bar.outside.height - size.editor.bar.inside.height) / 2;
    this.ctx.fillStyle = color.gray;
    this.ctx.fillRect(x, insideY, width, size.editor.bar.inside.height);

    this.ctx.fillStyle = color.white;
    for (let i = 0; i < number.beat; i++) {
      const beatLineX =
        x +
        width *
          (percentage.editor.barStartLine +
            ((1 - percentage.editor.barStartLine) * i) / number.beat) -
        size.editor.beatLine.width / 2;
      this.ctx.fillRect(
        beatLineX,
        insideY - 1,
        size.editor.beatLine.width,
        size.editor.bar.inside.height + 2
      );
    }
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

          this.ctx.strokeStyle = color.black;
          this.ctx.beginPath();
          this.ctx.moveTo(
            x - spaceWidth / 2 - 1,
            y - size[pane][noteSize].outside
          );
          this.ctx.lineTo(
            x + spaceWidth / 2 + 1,
            y - size[pane][noteSize].outside
          );
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.moveTo(
            x - spaceWidth / 2 - 1,
            y + size[pane][noteSize].outside
          );
          this.ctx.lineTo(
            x + spaceWidth / 2 + 1,
            y + size[pane][noteSize].outside
          );
          this.ctx.stroke();

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
