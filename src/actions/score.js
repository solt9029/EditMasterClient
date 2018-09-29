import axios from 'axios';
import config from '../config';
import history from '../history';
import qs from 'qs';

export const fetchData = (page, keyword) => {
  return async dispatch => {
    const result = await axios.get(
      `http://${config.api.host}:${
        config.api.port
      }/scores?page=${page}&keyword=${keyword}`
    );
    dispatch(setData(result.data));
  };
};

export const setData = data => ({
  type: 'SET_DATA',
  payload: data,
});
