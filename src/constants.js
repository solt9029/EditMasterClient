const constants = {
  color: {
    red: '#f00',
    yellow: '#ff0',
    blue: '#00f',
    white: '#fff',
    black: '#000',
    gray: '#bbb',
    purple: '#800080',
  },
  percentage: {
    editor: {
      barStartLine: 0.02,
    },
  },
  size: {
    player: {
      normal: {
        outside: 16,
        inside: 12,
      },
      big: {
        outside: 21,
        inside: 17,
      },
      barStartLine: {
        width: 2,
      },
      judgeText: 36,
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
      currentTime: {
        width: 4,
      },
    },
  },
  key: {
    copy: 'c',
    paste: 'v',
    don: ['f', 'j'],
    ka: ['d', 'k'],
    isDon: pushedKey => {
      return constants.key.don.indexOf(pushedKey) >= 0;
    },
    isKa: pushedKey => {
      return constants.key.ka.indexOf(pushedKey) >= 0;
    },
  },
  id: {
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
          noteId === constants.id.note.don ||
          noteId === constants.id.note.bigdon ||
          noteId === constants.id.note.renda ||
          noteId === constants.id.note.bigrenda ||
          noteId === constants.id.note.balloon
        );
      },
      isKa: noteId => {
        return (
          noteId === constants.id.note.ka ||
          noteId === constants.id.note.bigka ||
          noteId === constants.id.note.renda ||
          noteId === constants.id.note.bigrenda
        );
      },
      hasState: noteId => {
        return (
          noteId === constants.id.note.don ||
          noteId === constants.id.note.ka ||
          noteId === constants.id.note.bigdon ||
          noteId === constants.id.note.bigka
        );
      },
      isNote: noteId => {
        return (
          noteId === constants.id.note.don ||
          noteId === constants.id.note.ka ||
          noteId === constants.id.note.bigdon ||
          noteId === constants.id.note.bigka ||
          noteId === constants.id.note.renda ||
          noteId === constants.id.note.bigrenda ||
          noteId === constants.id.note.balloon ||
          noteId === constants.id.note.space
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
  },
  position: {
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
  },
  number: {
    notesPerBar: 96,
    beat: 4,
  },
  second: {
    range: {
      auto: 0.02,
      good: 0.034,
      ok: 0.117,
      bad: 0.15,
    },
  },
  sound: {
    don: {
      audio: new Audio('/files/don.wav'),
      trigger: () => {
        constants.sound.don.audio.currentTime = 0;
        constants.sound.don.audio.play();
      },
    },
    ka: {
      audio: new Audio('/files/ka.wav'),
      trigger: () => {
        constants.sound.ka.audio.currentTime = 0;
        constants.sound.ka.audio.play();
      },
    },
  },
  validation: {
    required: value => (value ? undefined : '必須項目です'),
    maxLength: max => value =>
      value && value.length > max
        ? `${max}文字以下で入力してください`
        : undefined,
    number: value =>
      value && isNaN(Number(value)) ? '数字で入力してください' : undefined,
  },
};

export default constants;
