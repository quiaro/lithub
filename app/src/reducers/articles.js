import {combineReducers} from 'redux';
import { handleAction, handleActions } from 'redux-actions';

/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);
export const getIsFetching = (state) => state.isFetching;

export const getAllHistory = (state) => state.historyAllIds.map(id => state.historyById[id]);
export const getIsFetchingHistory = (state) => state.isFetchingHistory;

/*
 * ----- REDUCERS
 */
const byId = handleAction('ARTICLE/FETCH_DONE', {
  next: (state, action) => (action.payload.entities.articles || {})
}, {});

const allIds = handleAction('ARTICLE/FETCH_DONE', {
  next: (state, action) => action.payload.result
}, []);

const isFetching = handleActions({
  'ARTICLE_FETCH': (state, action) => true,
  'ARTICLE/FETCH_DONE': (state, action) => false
}, false);

const historyById = handleAction('ARTICLE/HISTORY_FETCH_DONE', {
  next: (state, action) => (action.payload.entities.articles || {})
}, {});

const historyAllIds = handleAction('ARTICLE/HISTORY_FETCH_DONE', {
  next: (state, action) => action.payload.result
}, []);

const isFetchingHistory = handleActions({
  'ARTICLE_HISTORY_FETCH': (state, action) => true,
  'ARTICLE/HISTORY_FETCH_DONE': (state, action) => false
}, false);

const articles = combineReducers({
  byId,
  allIds,
  isFetching,
  historyById,
  historyAllIds,
  isFetchingHistory
});

export default articles
