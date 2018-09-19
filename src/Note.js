import { id } from './constants';

export default class Note {
  constructor(noteId) {
    this.id = noteId;
    this.state = id.state.fresh;
  }
  isFresh() {
    if (this.state === id.state.fresh) {
      return true;
    }
    return false;
  }
}
