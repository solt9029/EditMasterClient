import { drawCaret, clear } from '../utils/canvas';
import { calcEditorCanvasHeight } from '../utils/calculations';
import EditorCanvas from './EditorCanvas';

export default class EditorCaretCanvas extends EditorCanvas {
  updateCanvas(props) {
    const { width, notesLength, x, y } = props;
    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    drawCaret(this.ctx, x, y);
  }
}
