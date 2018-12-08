import {
  calcBarNum,
  calcEditorCanvasHeight,
  calcBarWidth,
} from '../utils/calculations';
import { drawBars, clear } from '../utils/canvas';
import EditorCanvas from './EditorCanvas';

export default class EditorBarsCanvas extends EditorCanvas {
  updateCanvas() {
    const { width, notesLength } = this.props;

    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const barNum = calcBarNum(notesLength);
    const barWidth = calcBarWidth(width);
    drawBars(this.ctx, barWidth, barNum);
  }
}
