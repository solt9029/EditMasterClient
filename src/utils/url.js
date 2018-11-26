import urlParse from 'url-parse';
import qs from 'qs';
import pathToRegexp from 'path-to-regexp';
import { routes } from '../constants/';

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

/**
 * @param {string} pathname
 * @return {boolean}
 */
export const matchScoresCreatePathname = pathname => {
  const isScoresShow = pathname.match(pathToRegexp(routes.SCORES.SHOW));
  const isScoresNew = pathname.match(pathToRegexp(routes.SCORES.NEW));
  return isScoresShow !== null || isScoresNew !== null;
};

/**
 * @param {string} pathname
 * @return {boolean}
 */
export const matchScoresIndexPathname = pathname => {
  return pathname.match(pathToRegexp(routes.SCORES.INDEX)) !== null;
};

export default {
  getVideoId,
  getQueries,
  matchScoresCreatePathname,
  matchScoresIndexPathname,
};
