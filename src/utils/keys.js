import { keys } from '../constants/';

export const isDon = pushedKey => {
  return keys.DON.indexOf(pushedKey) >= 0;
};

export const isKa = pushedKey => {
  return keys.KA.indexOf(pushedKey) >= 0;
};

export default {
  isDon,
  isKa,
};
