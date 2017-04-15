import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiArticles from '../api/articles'

const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' });

const actions = createActions({
  ARTICLE: {
    FETCH_DONE: response => normalize(response, articleSchema)
  },
  ARTICLES: {
    FETCH_DONE: [
      (data) => normalize(data, [ articleSchema ]),
      (data, meta) => meta
    ],
    LATEST_FETCH_DONE: response => normalize(response, [ articleSchema ])
  }
}, 'ARTICLE_FETCH', 'ARTICLES_FETCH', 'ARTICLES_LATEST_FETCH', 'RESET_ARTICLES');

export const fetchArticle = (id) => (dispatch) => {
  dispatch(actions.articleFetch());
  return apiArticles.fetchArticle(id).then(response => {
      dispatch(actions.article.fetchDone(response))
    },
    error => {
      dispatch(actions.article.fetchDone(error));
    });
}

export const fetchReadByOthers = (start, limit) => (dispatch) => {
  // Once the start index value is -1, it means there are
  // no more results to fetch
  if (start !== -1) {
    dispatch(actions.articlesFetch());
    return apiArticles.fetchReadByOthers(start, limit).then(response => {
        dispatch(actions.articles.fetchDone(response.data, response.meta))
      },
      error => {
        dispatch(actions.articles.fetchDone(error));
      });
  }
}

export const fetchLatestArticles = () => (dispatch) => {
  dispatch(actions.articlesLatestFetch());
  return apiArticles.fetchLatest().then(response => {
      dispatch(actions.articles.latestFetchDone(response))
    },
    error => {
      dispatch(actions.articles.latestFetchDone(error));
    });
}

export const resetArticles = () => (dispatch) => {
  dispatch(actions.resetArticles());
}
