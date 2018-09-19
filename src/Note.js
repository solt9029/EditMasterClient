import { id } from './constants';

export default class Note {
  constructor(noteId) {
    this.id = noteId;
    this.state = id.state.fresh;
  }
  isFresh() {
    return this.state === id.state.fresh;
  }
}
