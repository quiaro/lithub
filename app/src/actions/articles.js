import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as api from '../api'

const articleSchema = new schema.Entity('articles');

const actions = createActions({
  ARTICLE: {
    FETCH_DONE: response => normalize(response, [ articleSchema ]),
    HISTORY_FETCH_DONE: response => normalize(response, [ articleSchema ])
  }
}, 'ARTICLE_FETCH', 'ARTICLE_HISTORY_FETCH');

export const fetchArticles = () => (dispatch) => {
  dispatch(actions.articleFetch());
  return api.fetchArticles().then(response => {
      dispatch(actions.article.fetchDone(response))
    },
    error => {
      dispatch(actions.article.fetchDone(error));
    });
}

export const fetchArticlesHistory = () => (dispatch) => {
  dispatch(actions.articleHistoryFetch());
  return api.fetchArticlesHistory().then(response => {
      dispatch(actions.article.historyFetchDone(response))
    },
    error => {
      dispatch(actions.article.historyFetchDone(error));
    });
}
