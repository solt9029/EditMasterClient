export const required = value => (value ? undefined : '必須項目です');

export const maxLength = max => value =>
  value && value.length > max ? `${max}文字以下で入力してください` : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? '数字で入力してください' : undefined;
