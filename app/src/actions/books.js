import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiBooks from '../api/books'

const bookSchema = new schema.Entity('books', {}, { idAttribute: '_id' });

const actions = createActions({
  BOOK: {
    FETCH_DONE: response => normalize(response, bookSchema)
  },
  BOOKS: {
    FETCH_DONE: [
      (data) => normalize(data, [ bookSchema ]),
      (data, meta) => meta
    ],
    LATEST_FETCH_DONE: response => normalize(response, [ bookSchema ])
  }
}, 'BOOK_FETCH', 'BOOKS_FETCH', 'BOOKS_LATEST_FETCH', 'RESET_BOOKS');

export const fetchBook = (id) => (dispatch) => {
  dispatch(actions.bookFetch());
  return apiBooks.fetchBook(id).then(response => {
      dispatch(actions.book.fetchDone(response))
    },
    error => {
      dispatch(actions.book.fetchDone(error));
    });
}

export const fetchReadByOthers = (start, limit) => (dispatch) => {
  // Once the start index value is -1, it means there are
  // no more results to fetch
  if (start !== -1) {
    dispatch(actions.booksFetch());
    return apiBooks.fetchReadByOthers(start, limit).then(response => {
        dispatch(actions.books.fetchDone(response.data, response.meta))
      },
      error => {
        dispatch(actions.books.fetchDone(error));
      });
  }
}

export const fetchLatestBooks = () => (dispatch) => {
  dispatch(actions.booksLatestFetch());
  return apiBooks.fetchLatest().then(response => {
      dispatch(actions.books.latestFetchDone(response))
    },
    error => {
      dispatch(actions.books.latestFetchDone(error));
    });
}

export const resetBooks = () => (dispatch) => {
  dispatch(actions.resetBooks());
}
