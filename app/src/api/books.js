import { lithubRequest } from './lithub';

/**
 * Fetch a book
 * @param {bookId} bookId - ID of the book to fetch
 */
export const fetchBook = (bookId) => {
  return lithubRequest('get', `/api/books/${bookId}`);
}

/**
 * Fetch books read by other users
 * @param {number} start - Page item index start
 * @param {number} limit - Number of items per page (Default: 20, max number is 50)
 */
export const fetchReadByOthers = (start, limit) => {
  const pageLimit = limit ? `limit=${limit}` : '';
  const pageStart = start ? `start=${start}` : '';
  const url = (limit || start) ? `/api/books?${pageLimit}${pageStart}` : `/api/books`;

  return lithubRequest('get', url);
}

/**
 * Fetch latest books read by users
 */
export const fetchLatest = () => {
  return lithubRequest('get', '/api/books/latest', null, false);
}
