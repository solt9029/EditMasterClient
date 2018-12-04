import axios from 'axios';
import { Api } from '../config';

export const clients = {
  api: axios.create({
    baseURL: `http://${Api.HOST}:${Api.PORT}`,
  }),
  songle: axios.create({
    baseURL: 'http://widget.songle.jp',
  }),
};

/**
 *
 * @param {string} videoId
 * @return {Object}
 */
export const fetchSongle = videoId => {
  return clients.songle.get('/api/v1/song/beat.json', {
    params: {
      url: `www.youtube.com/watch?v=${videoId}`,
    },
  });
};

/**
 *
 * @param {Object} data
 * @return {Object}
 */
export const createScore = data => {
  return clients.api.post('/scores/create', data);
};

/**
 *
 * @param {number} page
 * @param {string} keyword
 * @return {Object}
 */
export const fetchScores = (page, keyword) => {
  return clients.api.get('/scores', {
    params: {
      page,
      keyword,
    },
  });
};

/**
 *
 * @param {number} id
 * @return {Object}
 */
export const fetchScore = id => {
  return clients.api.get(`/scores/${id}`);
};
