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
const byId = handleAction('QUOTE/FETCH_DONE', {
  next: (state, action) => (action.payload.entities.quotes || {})
}, {});

const allIds = handleAction('QUOTE/FETCH_DONE', {
  next: (state, action) => action.payload.result
}, []);

const isFetching = handleActions({
  'QUOTE_FETCH': (state, action) => true,
  'QUOTE/FETCH_DONE': (state, action) => false
}, false);

const historyById = handleAction('QUOTE/HISTORY_FETCH_DONE', {
  next: (state, action) => (action.payload.entities.quotes || {})
}, {});

const historyAllIds = handleAction('QUOTE/HISTORY_FETCH_DONE', {
  next: (state, action) => action.payload.result
}, []);

const isFetchingHistory = handleActions({
  'QUOTE_HISTORY_FETCH': (state, action) => true,
  'QUOTE/HISTORY_FETCH_DONE': (state, action) => false
}, false);

const quotes = combineReducers({
  byId,
  allIds,
  isFetching,
  historyById,
  historyAllIds,
  isFetchingHistory
});

export default quotes
