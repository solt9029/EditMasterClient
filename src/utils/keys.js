import constants from '../constants';

export const isDon = pushedKey => {
  return constants.key.don.indexOf(pushedKey) >= 0;
};

export const isKa = pushedKey => {
  return constants.key.ka.indexOf(pushedKey) >= 0;
};

export default {
  isDon,
  isKa,
};
