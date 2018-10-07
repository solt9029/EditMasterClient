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
    player: {
      speedToSpaceWidth: 3,
    },
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
      isDon: note => {
        return (
          note === constants.id.note.don ||
          note === constants.id.note.bigdon ||
          note === constants.id.note.renda ||
          note === constants.id.note.bigrenda ||
          note === constants.id.note.balloon
        );
      },
      isKa: note => {
        return (
          note === constants.id.note.ka ||
          note === constants.id.note.bigka ||
          note === constants.id.note.renda ||
          note === constants.id.note.bigrenda
        );
      },
      hasState: note => {
        return (
          note === constants.id.note.don ||
          note === constants.id.note.ka ||
          note === constants.id.note.bigdon ||
          note === constants.id.note.bigka
        );
      },
      isNote: note => {
        return (
          note === constants.id.note.don ||
          note === constants.id.note.ka ||
          note === constants.id.note.bigdon ||
          note === constants.id.note.bigka ||
          note === constants.id.note.renda ||
          note === constants.id.note.bigrenda ||
          note === constants.id.note.balloon ||
          note === constants.id.note.space
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
  validation: {
    required: value => {
      return value === '' ? '必須です' : false;
    },
    maxLength: max => value => {
      return value.length > max
        ? `${max}文字以下の文字列を指定してください`
        : false;
    },
    number: value => {
      return isNaN(value) ? '数値を指定してください' : false;
    },
    validate: (value, validations) => {
      let errors = [];
      validations.forEach(validation => {
        if (validation(value)) {
          errors.push(validation(value));
        }
      });
      return errors;
    },
  },
  route: {
    index: '/',
    help: '/help',
    scores: {
      index: '/scores',
      new: '/scores/new',
      show: '/scores/:id',
    },
  },
};

export default constants;
