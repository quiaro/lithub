import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as api from '../api'

const bookSchema = new schema.Entity('books');

const actions = createActions({
  BOOK: {
    FETCH_DONE: response => normalize(response, [ bookSchema ]),
    HISTORY_FETCH_DONE: response => normalize(response, [ bookSchema ])
  }
}, 'BOOK_FETCH', 'BOOK_HISTORY_FETCH');

export const fetchBooks = () => (dispatch) => {
  dispatch(actions.bookFetch());
  return api.fetchBooks().then(response => {
      dispatch(actions.book.fetchDone(response))
    },
    error => {
      dispatch(actions.book.fetchDone(error));
    });
}

export const fetchBooksHistory = () => (dispatch) => {
  dispatch(actions.bookHistoryFetch());
  return api.fetchBooksHistory().then(response => {
      dispatch(actions.book.historyFetchDone(response))
    },
    error => {
      dispatch(actions.book.historyFetchDone(error));
    });
}
