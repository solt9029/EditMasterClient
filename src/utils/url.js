import urlParse from 'url-parse';
import qs from 'qs';
import pathToRegexp from 'path-to-regexp';

/**
 *
 * @param {string} value
 * @return {string}
 */
export const normalizeVideoId = value => {
  let videoId = value;
  const url = urlParse(value, true);
  if (url.query.v) {
    videoId = url.query.v;
  }
  return videoId;
};

/**
 *
 * @param {string} search
 * @return {Object}
 */
export const parseSearchQuery = search => {
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const page = query.page ? query.page : 1;
  const keyword = query.keyword ? query.keyword : '';
  return { page, keyword };
};

/**
 *
 * @param {string} keyword
 * @param {number} page
 * @return {string}
 */
export const stringifySearchQuery = (keyword, page = 1) => {
  return qs.stringify(
    {
      page,
      keyword,
    },
    { addQueryPrefix: true }
  );
};

/**
 *
 * @param {string} target
 * @param {Array} pathnames
 * @return {boolean}
 */
export const matchPathnames = (target, pathnames) => {
  for (let i = 0; i < pathnames.length; i++) {
    if (target.match(pathToRegexp(pathnames[i])) !== null) {
      return true;
    }
  }
  return false;
};
