import { drawCaret, clear } from '../utils/canvas';
import EditorCanvas from './EditorCanvas';

export default class EditorCaretCanvas extends EditorCanvas {
  updateCanvas(props) {
    const { width, height, x, y, scroll } = props;
    clear(this.ctx, width - 1, height);

    drawCaret(this.ctx, x, y - scroll);
  }
}
