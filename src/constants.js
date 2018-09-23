export const color = {
  red: '#f00',
  yellow: '#ff0',
  blue: '#00f',
  white: '#fff',
  black: '#000',
  gray: '#bbb',
};

export const percentage = {
  editor: {
    barStartLine: 0.02,
  },
};

export const size = {
  player: {
    normal: {
      outside: 16,
      inside: 12,
    },
    big: {
      outside: 21,
      inside: 17,
    },
    space: {
      width: 3,
    },
    barStartLine: {
      width: 2,
    },
  },
  editor: {
    normal: {
      outside: 11,
      inside: 8,
    },
    big: {
      outside: 16,
      inside: 13,
    },
    bar: {
      outside: {
        height: 52,
      },
      inside: {
        height: 32,
      },
    },
    beatLine: {
      width: 2,
    },
    caret: {
      width: 2,
    },
  },
};

export const key = {
  don: ['f', 'j'],
  ka: ['d', 'k'],
  isDon: pushedKey => {
    return key.don.indexOf(pushedKey) >= 0;
  },
  isKa: pushedKey => {
    return key.ka.indexOf(pushedKey) >= 0;
  },
};

export const id = {
  note: {
    space: 0,
    don: 1,
    ka: 2,
    bigdon: 3,
    bigka: 4,
    renda: 5,
    bigrenda: 6,
    balloon: 7,
    isDon: noteId => {
      return (
        noteId === id.note.don ||
        noteId === id.note.bigdon ||
        noteId === id.note.renda ||
        noteId === id.note.bigrenda ||
        noteId === id.note.balloon
      );
    },
    isKa: noteId => {
      return (
        noteId === id.note.ka ||
        noteId === id.note.bigka ||
        noteId === id.note.renda ||
        noteId === id.note.bigrenda
      );
    },
    hasState: noteId => {
      return (
        noteId === id.note.don ||
        noteId === id.note.ka ||
        noteId === id.note.bigdon ||
        noteId === id.note.bigka
      );
    },
  },
  state: {
    fresh: 0,
    good: 1,
    ok: 2,
    bad: 3,
  },
  youtube: {
    unstarted: -1,
    ended: 0,
    playing: 1,
    paused: 2,
    buffering: 3,
    cued: 5,
  },
};

export const position = {
  player: {
    judge: {
      x: 50,
    },
  },
  editor: {
    bar: {
      x: 10,
    },
  },
};

export const number = {
  score: {
    column: 96,
  },
  beat: 4,
};

export const second = {
  range: {
    auto: 0.02,
    good: 0.034,
    ok: 0.117,
    bad: 0.15,
  },
};

export const sound = {
  don: {
    audio: new Audio('/files/don.wav'),
    trigger: () => {
      sound.don.audio.currentTime = 0;
      sound.don.audio.play();
    },
  },
  ka: {
    audio: new Audio('/files/ka.wav'),
    trigger: () => {
      sound.ka.audio.currentTime = 0;
      sound.ka.audio.play();
    },
  },
};

export const validation = {
  required: value => (value ? undefined : '必須項目です'),
  maxLength: max => value =>
    value && value.length > max
      ? `${max}文字以下で入力してください`
      : undefined,
  number: value =>
    value && isNaN(Number(value)) ? '数字で入力してください' : undefined,
};
