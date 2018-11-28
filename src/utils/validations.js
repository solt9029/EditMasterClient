export const required = value => {
  return value === '' ? '必須です' : false;
};

export const maxLength = max => value => {
  return value.length > max
    ? `${max}文字以下の文字列を指定してください`
    : false;
};

export const number = value => {
  return isNaN(value) ? '数値を指定してください' : false;
};

export const validate = (value, validations) => {
  let errors = [];
  validations.forEach(validation => {
    if (validation(value)) {
      errors.push(validation(value));
    }
  });
  return errors;
};
