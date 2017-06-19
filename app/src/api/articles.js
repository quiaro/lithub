import { lithubRequest } from './lithub';

/**
 * Fetch an article
 * @param {articleId} articleId - ID of the article to fetch
 */
export const fetchArticle = (articleId) => {
  return lithubRequest('get', `/api/articles/${articleId}`);
}

/**
 * Fetch articles read by other users
 * @param {number} start - Page item index start
 * @param {number} limit - Number of items per page (Default: 20, max number is 50)
 */
export const fetchReadByOthers = (start, limit) => {
  const pageLimit = limit ? `limit=${limit}` : '';
  const pageStart = start ? `start=${start}` : '';
  const url = (limit || start) ? `/api/articles?${pageLimit}${pageStart}` : `/api/articles`;

  return lithubRequest('get', url);
}

/**
 * Fetch latest articles read by users
 */
export const fetchLatest = () => {
  return lithubRequest('get', '/api/articles/latest', null, false);
}
