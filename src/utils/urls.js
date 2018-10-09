import urlParse from 'url-parse';

export const getVideoId = value => {
  let videoId = value;
  const url = urlParse(value, true);
  if (url.query.v) {
    videoId = url.query.v;
  }
  return videoId;
};

export default {
  getVideoId,
};
