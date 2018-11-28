/**
 *
 * @param {string} value
 * @return {boolean}
 */
export const required = value => {
  return value === '' ? '必須です' : false;
};

/**
 *
 * @param {number} max
 * @return {function}
 */
export const maxLength = max => value => {
  return value.length > max
    ? `${max}文字以下の文字列を指定してください`
    : false;
};

/**
 *
 * @param {*} value
 */
export const number = value => {
  return isNaN(value) ? '数値を指定してください' : false;
};

/**
 *
 * @param {*} value
 * @param {*} validations
 */
export const validate = (value, validations) => {
  let errors = [];
  validations.forEach(validation => {
    if (validation(value)) {
      errors.push(validation(value));
    }
  });
  return errors;
};
