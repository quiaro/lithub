import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import article from './article';
/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);
export const get = (state, id) => state.byId[id];
export const getLatest = (state) => state.latestAllIds.map(id => state.latestById[id]);
export const getIsFetchingArticle = (state) => state.isFetchingArticle;
export const getIsFetchingArticles = (state) => state.isFetching;
export const getIsFetchingLatest = (state) => state.isFetchingLatest;
export const getArticlesNextIndex = (state) => state.articlesNextIndex;

/*
 * ----- REDUCERS
 */

/*
 * === Articles Read by Others
 */
const byId = handleActions({
  'ARTICLES/FETCH_DONE': (state, action) => {
    // Merge in the result to the previous state
    return Object.assign({}, state, action.payload.entities.articles);
  },
  // When the API fetches articles read by others, these won't include all
  // the review details. When a specific article is fetched, these details will
  // be included. The previous article object in the state will be substituted
  // with this detailed one.
  'ARTICLE/FETCH_DONE': (state, action) => ({
      ...state,
      [action.payload.result]: article(state, action)
    }),
  'RESET_ARTICLES': (state, action) => ({})
}, {});

const allIds = handleActions({
  'ARTICLES/FETCH_DONE': (state, action) => {
    // Merge in the result to the previous state
    return state.concat(action.payload.result);
  },
  'ARTICLE/FETCH_DONE': (state, action) => {
    // Do not add key if it already exists
    const result = new Set([...state, action.payload.result]);
    return [...result];
  },
  'RESET_ARTICLES': (state, action) => ([])
}, []);

const articlesNextIndex = handleActions({
  'ARTICLES/FETCH_DONE': (state, action) => {
    // If the previous next index is the same as the current next index
    // then that means there are no more results to fetch, in which case
    // the state becomes -1.
    return (state !== action.meta.start) ?
       action.meta.start : -1;
  },
  'RESET_ARTICLES': (state, action) => 0
}, 0)

const isFetching = handleActions({
  'ARTICLES_FETCH': (state, action) => true,
  'ARTICLES/FETCH_DONE': (state, action) => false
}, false);

const isFetchingArticle = handleActions({
  'ARTICLE_FETCH': (state, action) => true,
  'ARTICLE/FETCH_DONE': (state, action) => false
}, false);

/*
 * === Latest Articles
 */
const latestById = handleAction('ARTICLES/LATEST_FETCH_DONE',
  (state, action) => (action.payload.entities.articles || {}), {});

const latestAllIds = handleAction('ARTICLES/LATEST_FETCH_DONE',
  (state, action) => action.payload.result, []);

const isFetchingLatest = handleActions({
  'ARTICLES_LATEST_FETCH': (state, action) => true,
  'ARTICLES/LATEST_FETCH_DONE': (state, action) => false
}, false);


const articles = combineReducers({
  byId,
  allIds,
  articlesNextIndex,
  isFetching,
  isFetchingArticle,
  isFetchingLatest,
  latestById,
  latestAllIds
});

export default articles
