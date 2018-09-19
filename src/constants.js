export const color = {
  red: '#f00',
  yellow: '#ff0',
  blue: '#00f',
  white: '#fff',
  black: '#000',
};

export const size = {
  normal: {
    outside: 16,
    inside: 12,
  },
  big: {
    outside: 21,
    inside: 17,
  },
  space: {
    width: 8,
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
  },
  state: {
    fresh: 0,
    good: 1,
    ok: 2,
    bad: 3,
  },
};

export const position = {
  judge: {
    x: 50,
  },
};

export const number = {
  score: {
    column: 48,
  },
};

export const second = {
  range: {
    good: 0.034,
    ok: 0.117,
    bad: 0.15,
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