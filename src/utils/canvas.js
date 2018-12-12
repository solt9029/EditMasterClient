import {
  Colors,
  Sizes,
  Positions,
  Ids,
  Percentages,
  Numbers,
} from '../constants/';

const radians = deg => deg * (Math.PI / 180);

export const clear = (ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);
  return;
};

export const drawBarStartLine = (ctx, x, height) => {
  ctx.fillStyle = Colors.GRAY;
  ctx.fillRect(
    x - Sizes.PLAYER.BAR_START_LINE.WIDTH / 2,
    0,
    Sizes.PLAYER.BAR_START_LINE.WIDTH,
    height
  );
  return;
};

export const drawCurrentTimeMark = (ctx, x, y) => {
  ctx.fillStyle = Colors.PURPLE;
  ctx.fillRect(
    x - Sizes.EDITOR.CURRENT_TIME_MARK.WIDTH / 2,
    y - 2,
    Sizes.EDITOR.CURRENT_TIME_MARK.WIDTH,
    Sizes.EDITOR.BAR.INSIDE.HEIGHT + 4
  );
  return;
};

export const drawCaret = (ctx, x, y) => {
  ctx.fillStyle = Colors.YELLOW;
  ctx.fillRect(
    x - Sizes.EDITOR.CARET.WIDTH / 2,
    y - 2,
    Sizes.EDITOR.CARET.WIDTH,
    Sizes.EDITOR.BAR.INSIDE.HEIGHT + 4
  );
  return;
};

/**
 *
 * @param {*} ctx
 * @param {number} y
 */
export const drawJudgeMark = (ctx, y) => {
  ctx.beginPath();
  ctx.strokeStyle = Colors.WHITE;
  ctx.arc(
    Positions.PLAYER.JUDGE.X,
    y,
    Sizes.PLAYER.NORMAL.OUTSIDE,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  return;
};

/**
 *
 * @param {*} ctx
 * @param {number} y
 * @param {number} state used for color change.
 */
export const drawFireworkEffect = (ctx, y, state) => {
  const goodColor = 'rgba(255, 255, 0, 0.3)';
  ctx.strokeStyle = goodColor;
  ctx.fillStyle = goodColor;
  if (state === Ids.STATE.OK) {
    const okColor = 'rgba(255, 255, 255, 0.3)';
    ctx.strokeStyle = okColor;
    ctx.fillStyle = okColor;
  }

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.arc(
    Positions.PLAYER.JUDGE.X,
    y,
    Sizes.PLAYER.NORMAL.OUTSIDE,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.lineWidth = 1;

  for (let deg = 0; deg < 360; deg += 20) {
    // circle
    ctx.save();
    ctx.beginPath();
    const cX = Positions.PLAYER.JUDGE.X - Math.cos(radians(deg)) * 40;
    const cY = y - Math.sin(radians(deg)) * 40;
    ctx.translate(cX, cY);
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();

    // ellipse
    ctx.save();
    ctx.beginPath();
    const eX = Positions.PLAYER.JUDGE.X - Math.cos(radians(deg)) * 28;
    const eY = y - Math.sin(radians(deg)) * 28;
    ctx.translate(eX, eY);
    ctx.rotate(radians(deg));
    ctx.scale(4.5, 1);
    ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();
  }
  return;
};

/**
 *
 * @param {*} ctx
 * @param {boolean} isDon
 * @param {number} playerWidth
 * @param {number} playerHeight
 */
export const drawBackgroundEffect = (ctx, isDon, playerWidth, playerHeight) => {
  const color = ctx.createLinearGradient(0, 0, playerWidth, playerHeight);
  if (isDon) {
    color.addColorStop(0.0, 'rgba(255, 0, 0, 0.2)');
    color.addColorStop(1.0, 'rgba(255, 0, 0, 0)');
  } else {
    color.addColorStop(0.0, 'rgba(0, 0, 255, 0.2)');
    color.addColorStop(1.0, 'rgba(0, 0, 255, 0)');
  }
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, playerWidth, playerHeight);
  return;
};

/**
 *
 * @param {*} ctx
 * @param {number} y
 * @param {number} state
 */
export const drawJudgeEffect = (ctx, y, state) => {
  ctx.font = `${Sizes.PLAYER.JUDGE_TEXT}px HG行書体, bold`;
  let text = '良';
  let textColor = Colors.RED;
  switch (state) {
    case Ids.STATE.OK:
      text = '可';
      textColor = Colors.WHITE;
      break;
    case Ids.STATE.BAD:
      text = '不可';
      textColor = Colors.BLUE;
      break;
    default:
      break;
  }
  ctx.fillStyle = textColor;
  ctx.fillText(
    text,
    Positions.PLAYER.JUDGE.X - (text.length * Sizes.PLAYER.JUDGE_TEXT) / 2,
    y
  );
  ctx.strokeStyle = Colors.BLACK;
  ctx.strokeText(
    text,
    Positions.PLAYER.JUDGE.X - (text.length * Sizes.PLAYER.JUDGE_TEXT) / 2,
    y
  );
  return;
};

export const drawBar = (ctx, x, y, width) => {
  const insideY =
    y + (Sizes.EDITOR.BAR.OUTSIDE.HEIGHT - Sizes.EDITOR.BAR.INSIDE.HEIGHT) / 2;
  ctx.fillStyle = Colors.GRAY;
  ctx.fillRect(x, insideY, width, Sizes.EDITOR.BAR.INSIDE.HEIGHT);

  ctx.fillStyle = Colors.WHITE;
  for (let i = 0; i < Numbers.BEAT; i++) {
    const beatLineX =
      x +
      width *
        (Percentages.EDITOR.BAR_START_LINE +
          ((1 - Percentages.EDITOR.BAR_START_LINE) * i) / Numbers.BEAT) -
      Sizes.EDITOR.BEAT_LINE.WIDTH / 2;
    ctx.fillRect(
      beatLineX,
      insideY - 1,
      Sizes.EDITOR.BEAT_LINE.WIDTH,
      Sizes.EDITOR.BAR.INSIDE.HEIGHT + 2
    );
  }
  return;
};

export const drawBars = (ctx, width, num, startY = 0) => {
  for (let i = 0; i < num; i++) {
    drawBar(
      ctx,
      Positions.EDITOR.BAR.X,
      i * Sizes.EDITOR.BAR.OUTSIDE.HEIGHT + startY,
      width
    );
  }
  return;
};

export const drawNote = (
  ctx,
  x,
  y,
  pane,
  note,
  spaceWidth = 0,
  previousNote = Ids.NOTE.SPACE,
  nextNote = Ids.NOTE.SPACE
) => {
  let noteSize = 'NORMAL';
  let noteColor = Colors.RED;

  switch (note) {
    case Ids.NOTE.KA:
      noteColor = Colors.BLUE;
      break;
    case Ids.NOTE.BIGDON:
      noteSize = 'BIG';
      break;
    case Ids.NOTE.BIGKA:
      noteSize = 'BIG';
      noteColor = Colors.BLUE;
      break;
    case Ids.NOTE.RENDA:
      noteColor = Colors.YELLOW;
      break;
    case Ids.NOTE.BIGRENDA:
      noteColor = Colors.YELLOW;
      noteSize = 'BIG';
      break;
    default:
      break;
  }

  if (
    note === Ids.NOTE.RENDA ||
    note === Ids.NOTE.BIGRENDA ||
    note === Ids.NOTE.BALLOON
  ) {
    if (note === previousNote) {
      if (note === nextNote) {
        // extension
        ctx.fillStyle = noteColor;
        ctx.fillRect(
          x - spaceWidth - 1,
          y - Sizes[pane][noteSize].OUTSIDE,
          spaceWidth * 2 + 2,
          Sizes[pane][noteSize].OUTSIDE * 2
        );

        ctx.strokeStyle = Colors.BLACK;
        ctx.beginPath();
        ctx.moveTo(x - spaceWidth - 1, y - Sizes[pane][noteSize].OUTSIDE);
        ctx.lineTo(x + spaceWidth + 1, y - Sizes[pane][noteSize].OUTSIDE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - spaceWidth - 1, y + Sizes[pane][noteSize].OUTSIDE);
        ctx.lineTo(x + spaceWidth + 1, y + Sizes[pane][noteSize].OUTSIDE);
        ctx.stroke();

        return;
      }

      // end
      ctx.beginPath();
      ctx.fillStyle = noteColor;
      ctx.strokeStyle = Colors.BLACK;
      ctx.arc(x, y, Sizes[pane][noteSize].OUTSIDE, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      return;
    }
  }

  // start
  ctx.beginPath();
  ctx.fillStyle = Colors.WHITE;
  ctx.strokeStyle = Colors.BLACK;
  ctx.arc(x, y, Sizes[pane][noteSize].OUTSIDE, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = noteColor;
  ctx.arc(x, y, Sizes[pane][noteSize].INSIDE, 0, Math.PI * 2);
  ctx.fill();

  return;
};
