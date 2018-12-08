import { drawCaret, clear } from '../utils/canvas';
import { calcEditorCanvasHeight } from '../utils/calculations';
import EditorCanvas from './EditorCanvas';

export default class EditorCaretCanvas extends EditorCanvas {
  // TODO: if shouldComponentUpdate isn't impletemented here, delay occurs. check this issue later.
  shouldComponentUpdate() {
    return true;
  }

  updateCanvas() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const { x, y } = this.props;
    drawCaret(this.ctx, x, y);
  }
}
