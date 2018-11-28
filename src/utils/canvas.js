import {
  colors,
  sizes,
  positions,
  ids,
  percentages,
  numbers,
} from '../constants/';

export const clear = (ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);
  return;
};

export const drawBarStartLine = (ctx, x, height) => {
  ctx.fillStyle = colors.GRAY;
  ctx.fillRect(
    x - sizes.PLAYER.BAR_START_LINE.WIDTH / 2,
    0,
    sizes.PLAYER.BAR_START_LINE.WIDTH,
    height
  );
  return;
};

export const drawCurrentTimeMark = (ctx, x, y) => {
  ctx.fillStyle = colors.PURPLE;
  ctx.fillRect(
    x - sizes.EDITOR.CURRENT_TIME_MARK.WIDTH / 2,
    y - 2,
    sizes.EDITOR.CURRENT_TIME_MARK.WIDTH,
    sizes.EDITOR.BAR.INSIDE.HEIGHT + 4
  );
  return;
};

export const drawCaret = (ctx, x, y) => {
  ctx.fillStyle = colors.YELLOW;
  ctx.fillRect(
    x - sizes.EDITOR.CARET.WIDTH / 2,
    y - 2,
    sizes.EDITOR.CARET.WIDTH,
    sizes.EDITOR.BAR.INSIDE.HEIGHT + 4
  );
  return;
};

export const drawJudgeMark = (ctx, y) => {
  ctx.beginPath();
  ctx.strokeStyle = colors.WHITE;
  ctx.arc(
    positions.PLAYER.JUDGE.X,
    y,
    sizes.PLAYER.NORMAL.OUTSIDE,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  return;
};

export const drawJudgeEffect = (ctx, markY, textY, stateId) => {
  // mark
  ctx.beginPath();
  ctx.strokeStyle = colors.YELLOW;
  ctx.lineWidth = 3;
  ctx.arc(
    positions.PLAYER.JUDGE.X,
    markY,
    sizes.PLAYER.NORMAL.OUTSIDE,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.lineWidth = 1;

  // text
  ctx.font = `${sizes.PLAYER.JUDGE_TEXT}px HG行書体, bold`;
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
  ctx.fillStyle = textColor;
  ctx.fillText(
    text,
    positions.PLAYER.JUDGE.X - (text.length * sizes.PLAYER.JUDGE_TEXT) / 2,
    textY
  );
  ctx.strokeStyle = colors.BLACK;
  ctx.strokeText(
    text,
    positions.PLAYER.JUDGE.X - (text.length * sizes.PLAYER.JUDGE_TEXT) / 2,
    textY
  );
  return;
};

export const drawBar = (ctx, x, y, width) => {
  const insideY =
    y + (sizes.EDITOR.BAR.OUTSIDE.HEIGHT - sizes.EDITOR.BAR.INSIDE.HEIGHT) / 2;
  ctx.fillStyle = colors.GRAY;
  ctx.fillRect(x, insideY, width, sizes.EDITOR.BAR.INSIDE.HEIGHT);

  ctx.fillStyle = colors.WHITE;
  for (let i = 0; i < numbers.BEAT; i++) {
    const beatLineX =
      x +
      width *
        (percentages.EDITOR.BAR_START_LINE +
          ((1 - percentages.EDITOR.BAR_START_LINE) * i) / numbers.BEAT) -
      sizes.EDITOR.BEAT_LINE.WIDTH / 2;
    ctx.fillRect(
      beatLineX,
      insideY - 1,
      sizes.EDITOR.BEAT_LINE.WIDTH,
      sizes.EDITOR.BAR.INSIDE.HEIGHT + 2
    );
  }
  return;
};

export const drawBars = (ctx, width, num) => {
  for (let i = 0; i < num; i++) {
    drawBar(
      ctx,
      positions.EDITOR.BAR.X,
      i * sizes.EDITOR.BAR.OUTSIDE.HEIGHT,
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
  previousNote = ids.NOTE.SPACE,
  nextNote = ids.NOTE.SPACE
) => {
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
        ctx.fillStyle = noteColor;
        ctx.fillRect(
          x - spaceWidth - 1,
          y - sizes[pane][noteSize].OUTSIDE,
          spaceWidth * 2 + 2,
          sizes[pane][noteSize].OUTSIDE * 2
        );

        ctx.strokeStyle = colors.BLACK;
        ctx.beginPath();
        ctx.moveTo(x - spaceWidth - 1, y - sizes[pane][noteSize].OUTSIDE);
        ctx.lineTo(x + spaceWidth + 1, y - sizes[pane][noteSize].OUTSIDE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - spaceWidth - 1, y + sizes[pane][noteSize].OUTSIDE);
        ctx.lineTo(x + spaceWidth + 1, y + sizes[pane][noteSize].OUTSIDE);
        ctx.stroke();

        return;
      }

      // end
      ctx.beginPath();
      ctx.fillStyle = noteColor;
      ctx.strokeStyle = colors.BLACK;
      ctx.arc(x, y, sizes[pane][noteSize].OUTSIDE, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      return;
    }
  }

  // start
  ctx.beginPath();
  ctx.fillStyle = colors.WHITE;
  ctx.strokeStyle = colors.BLACK;
  ctx.arc(x, y, sizes[pane][noteSize].OUTSIDE, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = noteColor;
  ctx.arc(x, y, sizes[pane][noteSize].INSIDE, 0, Math.PI * 2);
  ctx.fill();

  return;
};
