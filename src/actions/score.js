import axios from 'axios';
import config from '../config';

export const fetchData = page => {
  return async dispatch => {
    const result = await axios.get(
      `http://${config.api.host}:${config.api.port}/scores?page=${page}`
    );
    dispatch(setData(result.data));
  };
};

export const setData = data => ({
  type: 'SET_DATA',
  payload: data,
});
