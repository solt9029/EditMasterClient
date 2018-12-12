import {
  calcBarNum,
  calcBarWidth,
  calcBarIndexRangeInCanvas,
} from '../utils/calculations';
import { drawBars, clear } from '../utils/canvas';
import EditorCanvas from './EditorCanvas';

export default class EditorBarsCanvas extends EditorCanvas {
  updateCanvas(props) {
    const { width, height, notesLength, scroll } = props;
    clear(this.ctx, width - 1, height);

    const barNum = calcBarNum(notesLength);
    const barWidth = calcBarWidth(width);
    const [firstIndex, lastIndex] = calcBarIndexRangeInCanvas(
      barNum,
      scroll,
      height
    );
    drawBars(this.ctx, 0, -scroll, barWidth, firstIndex, lastIndex);
  }
}
