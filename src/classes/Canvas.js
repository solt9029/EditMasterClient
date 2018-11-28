import {
  colors,
  sizes,
  positions,
  ids,
  percentages,
  numbers,
} from '../constants/';

export default class Canvas {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear(width, height) {
    this.ctx.clearRect(0, 0, width, height);
    return;
  }

  drawBarStartLine(x, height) {
    this.ctx.fillStyle = colors.GRAY;
    this.ctx.fillRect(
      x - sizes.PLAYER.BAR_START_LINE.WIDTH / 2,
      0,
      sizes.PLAYER.BAR_START_LINE.WIDTH,
      height
    );
  }

  drawCurrentTimeMark(x, y) {
    this.ctx.fillStyle = colors.PURPLE;
    this.ctx.fillRect(
      x - sizes.EDITOR.CURRENT_TIME_MARK.WIDTH / 2,
      y - 2,
      sizes.EDITOR.CURRENT_TIME_MARK.WIDTH,
      sizes.EDITOR.BAR.INSIDE.HEIGHT + 4
    );
    return;
  }

  drawCaret(x, y) {
    this.ctx.fillStyle = colors.YELLOW;
    this.ctx.fillRect(
      x - sizes.EDITOR.CARET.WIDTH / 2,
      y - 2,
      sizes.EDITOR.CARET.WIDTH,
      sizes.EDITOR.BAR.INSIDE.HEIGHT + 4
    );
    return;
  }

  drawJudgeMark(y) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = colors.WHITE;
    this.ctx.arc(
      positions.PLAYER.JUDGE.X,
      y,
      sizes.PLAYER.NORMAL.OUTSIDE,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
    return;
  }

  drawJudgeEffect(markY, textY, stateId) {
    // mark
    this.ctx.beginPath();
    this.ctx.strokeStyle = colors.YELLOW;
    this.ctx.lineWidth = 3;
    this.ctx.arc(
      positions.PLAYER.JUDGE.X,
      markY,
      sizes.PLAYER.NORMAL.OUTSIDE,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
    this.ctx.lineWidth = 1;

    // text
    this.ctx.font = `${sizes.PLAYER.JUDGE_TEXT}px HG行書体, bold`;
    let text = '良';
    let textColor = colors.RED;
    switch (stateId) {
      case ids.STATE.OK:
        text = '可';
        textColor = colors.WHITE;
        break;
      case ids.STATE.BAD:
        text = '不可';
        textColor = colors.BLUE;
        break;
      default:
        break;
    }
    this.ctx.fillStyle = textColor;
    this.ctx.fillText(
      text,
      positions.PLAYER.JUDGE.X - (text.length * sizes.PLAYER.JUDGE_TEXT) / 2,
      textY
    );
    this.ctx.strokeStyle = colors.BLACK;
    this.ctx.strokeText(
      text,
      positions.PLAYER.JUDGE.X - (text.length * sizes.PLAYER.JUDGE_TEXT) / 2,
      textY
    );

    return;
  }

  drawBar(x, y, width) {
    const insideY =
      y +
      (sizes.EDITOR.BAR.OUTSIDE.HEIGHT - sizes.EDITOR.BAR.INSIDE.HEIGHT) / 2;
    this.ctx.fillStyle = colors.GRAY;
    this.ctx.fillRect(x, insideY, width, sizes.EDITOR.BAR.INSIDE.HEIGHT);

    this.ctx.fillStyle = colors.WHITE;
    for (let i = 0; i < numbers.BEAT; i++) {
      const beatLineX =
        x +
        width *
          (percentages.EDITOR.BAR_START_LINE +
            ((1 - percentages.EDITOR.BAR_START_LINE) * i) / numbers.BEAT) -
        sizes.EDITOR.BEAT_LINE.WIDTH / 2;
      this.ctx.fillRect(
        beatLineX,
        insideY - 1,
        sizes.EDITOR.BEAT_LINE.WIDTH,
        sizes.EDITOR.BAR.INSIDE.HEIGHT + 2
      );
    }
  }

  drawBars(width, num) {
    for (let i = 0; i < num; i++) {
      this.drawBar(
        positions.EDITOR.BAR.X,
        i * sizes.EDITOR.BAR.OUTSIDE.HEIGHT,
        width
      );
    }
  }

  drawNote(
    x,
    y,
    pane,
    note,
    spaceWidth = 0,
    previousNote = ids.NOTE.SPACE,
    nextNote = ids.NOTE.SPACE
  ) {
    let noteSize = 'NORMAL';
    let noteColor = colors.RED;

    switch (note) {
      case ids.NOTE.KA:
        noteColor = colors.BLUE;
        break;
      case ids.NOTE.BIGDON:
        noteSize = 'BIG';
        break;
      case ids.NOTE.BIGKA:
        noteSize = 'BIG';
        noteColor = colors.BLUE;
        break;
      case ids.NOTE.RENDA:
        noteColor = colors.YELLOW;
        break;
      case ids.NOTE.BIGRENDA:
        noteColor = colors.YELLOW;
        noteSize = 'BIG';
        break;
      default:
        break;
    }

    if (
      note === ids.NOTE.RENDA ||
      note === ids.NOTE.BIGRENDA ||
      note === ids.NOTE.BALLOON
    ) {
      if (note === previousNote) {
        if (note === nextNote) {
          // extension
          this.ctx.fillStyle = noteColor;
          this.ctx.fillRect(
            x - spaceWidth - 1,
            y - sizes[pane][noteSize].OUTSIDE,
            spaceWidth * 2 + 2,
            sizes[pane][noteSize].OUTSIDE * 2
          );

          this.ctx.strokeStyle = colors.BLACK;
          this.ctx.beginPath();
          this.ctx.moveTo(
            x - spaceWidth - 1,
            y - sizes[pane][noteSize].OUTSIDE
          );
          this.ctx.lineTo(
            x + spaceWidth + 1,
            y - sizes[pane][noteSize].OUTSIDE
          );
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.moveTo(
            x - spaceWidth - 1,
            y + sizes[pane][noteSize].OUTSIDE
          );
          this.ctx.lineTo(
            x + spaceWidth + 1,
            y + sizes[pane][noteSize].OUTSIDE
          );
          this.ctx.stroke();

          return;
        }

        // end
        this.ctx.beginPath();
        this.ctx.fillStyle = noteColor;
        this.ctx.strokeStyle = colors.BLACK;
        this.ctx.arc(x, y, sizes[pane][noteSize].OUTSIDE, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        return;
      }
    }

    // start
    this.ctx.beginPath();
    this.ctx.fillStyle = colors.WHITE;
    this.ctx.strokeStyle = colors.BLACK;
    this.ctx.arc(x, y, sizes[pane][noteSize].OUTSIDE, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = noteColor;
    this.ctx.arc(x, y, sizes[pane][noteSize].INSIDE, 0, Math.PI * 2);
    this.ctx.fill();

    return;
  }
}
