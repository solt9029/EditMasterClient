import axios from 'axios';
import { api } from '../config';

export const clients = {
  api: axios.create({
    baseURL: `http://${api.HOST}:${api.PORT}`,
  }),
  songle: axios.create({
    baseURL: 'http://widget.songle.jp',
  }),
};

export const getSongle = videoId => {
  return clients.songle.get('/api/v1/song/beat.json', {
    params: {
      url: `www.youtube.com/watch?v=${videoId}`,
    },
  });
};

export const createScore = data => {
  return clients.api.post('/scores/create', data);
};

export const getScores = (page, keyword) => {
  return clients.api.get('/scores', {
    params: {
      page,
      keyword,
    },
  });
};

export const getScore = id => {
  return clients.api.get(`/scores/${id}`);
};

export default { clients, getSongle, createScore, getScores, getScore };