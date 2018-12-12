import { Percentages, Sizes, Positions, Numbers, Ids } from '../constants';
import {
  calcBarWidth,
  calcNoteIndexRangeInEditorCanvas,
} from '../utils/calculations';
import { clear, drawNote } from '../utils/canvas';
import EditorCanvas from './EditorCanvas';

export default class EditorNotesCanvas extends EditorCanvas {
  updateCanvas(props) {
    const { notes, width, height, scroll } = props;
    clear(this.ctx, width - 1, height);

    const barWidth = calcBarWidth(width);

    // notes
    const actualBarWidth = barWidth * (1 - Percentages.EDITOR.BAR_START_LINE); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / Numbers.NOTES_PER_BAR;
    const barStartLineX =
      Positions.EDITOR.BAR.X + barWidth * Percentages.EDITOR.BAR_START_LINE;

    const [firstIndex, lastIndex] = calcNoteIndexRangeInEditorCanvas(
      notes.length,
      scroll,
      height
    );

    for (let i = lastIndex; i >= firstIndex; i--) {
      const note = notes[i];
      if (note === Ids.NOTE.SPACE) {
        continue;
      }
      const c = i % Numbers.NOTES_PER_BAR;
      const l = Math.floor(i / Numbers.NOTES_PER_BAR);
      const x = barStartLineX + spaceWidth * c;
      const y = Sizes.EDITOR.BAR.OUTSIDE.HEIGHT * (l + 0.5);
      const previousNote = i > 0 ? notes[i - 1] : Ids.NOTE.SPACE;
      const nextNote = i < notes.length - 1 ? notes[i + 1] : Ids.NOTE.SPACE;

      drawNote(
        this.ctx,
        x,
        y - scroll,
        'EDITOR',
        note,
        spaceWidth,
        previousNote,
        nextNote
      );
    }
  }
}
