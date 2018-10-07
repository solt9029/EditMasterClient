import constants from '../constants';

export default class Canvas {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear(width, height) {
    this.ctx.clearRect(0, 0, width, height);
    return;
  }

  drawBarStartLine(x, height) {
    this.ctx.fillStyle = constants.color.gray;
    this.ctx.fillRect(
      x - constants.size.player.barStartLine.width / 2,
      0,
      constants.size.player.barStartLine.width,
      height
    );
  }

  drawCurrentTime(x, y) {
    this.ctx.fillStyle = constants.color.purple;
    this.ctx.fillRect(
      x - constants.size.editor.currentTime.width / 2,
      y - 2,
      constants.size.editor.currentTime.width,
      constants.size.editor.bar.inside.height + 4
    );
    return;
  }

  drawCaret(x, y) {
    this.ctx.fillStyle = constants.color.yellow;
    this.ctx.fillRect(
      x - constants.size.editor.caret.width / 2,
      y - 2,
      constants.size.editor.caret.width,
      constants.size.editor.bar.inside.height + 4
    );
    return;
  }

  drawJudgeMark(y) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = constants.color.white;
    this.ctx.arc(
      constants.position.player.judge.x,
      y,
      constants.size.player.normal.outside,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
    return;
  }

  drawJudgeEffect(markY, textY, stateId) {
    // mark
    this.ctx.beginPath();
    this.ctx.strokeStyle = constants.color.yellow;
    this.ctx.lineWidth = 3;
    this.ctx.arc(
      constants.position.player.judge.x,
      markY,
      constants.size.player.normal.outside,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
    this.ctx.lineWidth = 1;

    // text
    this.ctx.font = `${constants.size.player.judgeText}px HG行書体, bold`;
    let text = '良';
    let textColor = constants.color.red;
    switch (stateId) {
      case constants.id.state.ok:
        text = '可';
        textColor = constants.color.white;
        break;
      case constants.id.state.bad:
        text = '不可';
        textColor = constants.color.blue;
        break;
      default:
        break;
    }
    this.ctx.fillStyle = textColor;
    this.ctx.fillText(
      text,
      constants.position.player.judge.x -
        (text.length * constants.size.player.judgeText) / 2,
      textY
    );
    this.ctx.strokeStyle = constants.color.black;
    this.ctx.strokeText(
      text,
      constants.position.player.judge.x -
        (text.length * constants.size.player.judgeText) / 2,
      textY
    );

    return;
  }

  drawBar(x, y, width) {
    const insideY =
      y +
      (constants.size.editor.bar.outside.height -
        constants.size.editor.bar.inside.height) /
        2;
    this.ctx.fillStyle = constants.color.gray;
    this.ctx.fillRect(
      x,
      insideY,
      width,
      constants.size.editor.bar.inside.height
    );

    this.ctx.fillStyle = constants.color.white;
    for (let i = 0; i < constants.number.beat; i++) {
      const beatLineX =
        x +
        width *
          (constants.percentage.editor.barStartLine +
            ((1 - constants.percentage.editor.barStartLine) * i) /
              constants.number.beat) -
        constants.size.editor.beatLine.width / 2;
      this.ctx.fillRect(
        beatLineX,
        insideY - 1,
        constants.size.editor.beatLine.width,
        constants.size.editor.bar.inside.height + 2
      );
    }
  }

  drawNote(
    x,
    y,
    pane,
    note,
    spaceWidth = 0,
    previousNote = constants.id.note.space,
    nextNote = constants.id.note.space
  ) {
    let noteSize = 'normal';
    let noteColor = constants.color.red;

    switch (note) {
      case constants.id.note.ka:
        noteColor = constants.color.blue;
        break;
      case constants.id.note.bigdon:
        noteSize = 'big';
        break;
      case constants.id.note.bigka:
        noteSize = 'big';
        noteColor = constants.color.blue;
        break;
      case constants.id.note.renda:
        noteColor = constants.color.yellow;
        break;
      case constants.id.note.bigrenda:
        noteColor = constants.color.yellow;
        noteSize = 'big';
        break;
      default:
        break;
    }

    if (
      note === constants.id.note.renda ||
      note === constants.id.note.bigrenda ||
      note === constants.id.note.balloon
    ) {
      if (note === previousNote) {
        if (note === nextNote) {
          // extension
          this.ctx.fillStyle = noteColor;
          this.ctx.fillRect(
            x - spaceWidth - 1,
            y - constants.size[pane][noteSize].outside,
            spaceWidth * 2 + 2,
            constants.size[pane][noteSize].outside * 2
          );

          this.ctx.strokeStyle = constants.color.black;
          this.ctx.beginPath();
          this.ctx.moveTo(
            x - spaceWidth - 1,
            y - constants.size[pane][noteSize].outside
          );
          this.ctx.lineTo(
            x + spaceWidth + 1,
            y - constants.size[pane][noteSize].outside
          );
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.moveTo(
            x - spaceWidth - 1,
            y + constants.size[pane][noteSize].outside
          );
          this.ctx.lineTo(
            x + spaceWidth + 1,
            y + constants.size[pane][noteSize].outside
          );
          this.ctx.stroke();

          return;
        }

        // end
        this.ctx.beginPath();
        this.ctx.fillStyle = noteColor;
        this.ctx.strokeStyle = constants.color.black;
        this.ctx.arc(
          x,
          y,
          constants.size[pane][noteSize].outside,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.stroke();
        return;
      }
    }

    // start
    this.ctx.beginPath();
    this.ctx.fillStyle = constants.color.white;
    this.ctx.strokeStyle = constants.color.black;
    this.ctx.arc(x, y, constants.size[pane][noteSize].outside, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = noteColor;
    this.ctx.arc(x, y, constants.size[pane][noteSize].inside, 0, Math.PI * 2);
    this.ctx.fill();

    return;
  }
}
