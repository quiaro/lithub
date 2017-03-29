import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as api from '../api'

const bookSchema = new schema.Entity('books');

const actions = createActions({
  BOOK: {
    FETCH_DONE: response => normalize(response, [ bookSchema ])
  }
}, 'BOOK_FETCH');

export const fetchBooks = () => (dispatch) => {
  dispatch(actions.bookFetch());
  return api.fetchBooks().then(response => {
      dispatch(actions.book.fetchDone(response))
    },
    error => {
      dispatch(actions.book.fetchDone(error));
    });
}
