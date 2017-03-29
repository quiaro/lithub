import { normalize } from 'normalizr';
import { createActions } from 'redux-actions';

import * as api from '../api'
import { bookSchema } from './schema'
import { articleSchema } from './schema'

const actions = createActions({
  BOOK: {
    FETCH_DONE: response => normalize(response, [ bookSchema ])
  },
  ARTICLE: {
    FETCH_DONE: response => normalize(response, [ articleSchema ])
  }
}, 'BOOK_FETCH', 'ARTICLE_FETCH');

export const fetchBooks = () => (dispatch) => {
  dispatch(actions.bookFetch());
  return api.fetchBooks().then(response => {
      dispatch(actions.book.fetchDone(response))
    },
    error => {
      dispatch(actions.book.fetchDone(error));
    });
}

export const fetchArticles = () => (dispatch) => {
  dispatch(actions.articleFetch());
  return api.fetchArticles().then(response => {
      dispatch(actions.article.fetchDone(response))
    },
    error => {
      dispatch(actions.article.fetchDone(error));
    });
}
