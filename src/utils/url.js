import urlParse from 'url-parse';
import qs from 'qs';

export const getVideoId = value => {
  let videoId = value;
  const url = urlParse(value, true);
  if (url.query.v) {
    videoId = url.query.v;
  }
  return videoId;
};

export const getQueries = search => {
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const page = query.page ? query.page : 1;
  const keyword = query.keyword ? query.keyword : '';
  return { page, keyword };
};

export default {
  getVideoId,
  getQueries,
};
