import { lithubRequest } from './lithub';

/**
 * Fetch a quote
 * @param {quoteId} quoteId - ID of the quote to fetch
 */
export const fetchQuote = (quoteId) => {
  return lithubRequest('get', `/api/quotes/${quoteId}`);
}

/**
 * Fetch quotes read by other users
 * @param {number} start - Page item index start
 * @param {number} limit - Number of items per page (Default: 20, max number is 50)
 */
export const fetchReadByOthers = (start, limit) => {
  const pageLimit = limit ? `limit=${limit}` : '';
  const pageStart = start ? `start=${start}` : '';
  const url = (limit || start) ? `/api/quotes?${pageLimit}${pageStart}` : `/api/quotes`;

  return lithubRequest('get', url);
}

/**
 * Fetch latest quotes read by users
 */
export const fetchLatest = () => {
  return lithubRequest('get', '/api/quotes/latest', null, false);
}
