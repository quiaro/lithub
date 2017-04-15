import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';

import review from './review';
/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);
export const get = (state, id) => state.byId[id];
export const getIsFetching = (state) => state.isFetching;
export const getWasFetched = (state) => state.wasFetched;

/*
 * ----- REDUCERS
 */

/*
 * Dictionary of articles in the article history (objects)
 */
const byId = handleActions({
  'ARTICLE_HISTORY/FETCH_DONE': {
    next: (state, action) => (action.payload.entities.reviews || {})
  },
  [combineActions('ARTICLE_HISTORY/ADD', 'ARTICLE_HISTORY/EDIT')](state, action) {
    return {
      ...state,
      [action.payload.result]: review(state, action)
    };
  },
  'ARTICLE_HISTORY/REMOVE': (state, action) => {
    // Remove key from copied state
    const newState = { ...state };
    delete newState[action.payload.result];
    return newState;
  },
  'LOG_OUT': (state, action) => ({})
}, {});

/*
 * Array of all article IDs in the article history
 */
const allIds = handleActions({
  'ARTICLE_HISTORY/FETCH_DONE': {
    next: (state, action) => action.payload.result
  },
  'ARTICLE_HISTORY/ADD': (state, action) => ([...state, action.payload.result]),
  'ARTICLE_HISTORY/REMOVE': (state, action) => {
    // Return all ids minus the one of the review that is being deleted
    return state.filter(id => id !== action.payload.result);
  },
  'LOG_OUT': (state, action) => ([])
}, []);

const isFetching = handleActions({
  'ARTICLE_HISTORY_FETCH': (state, action) => true,
  'ARTICLE_HISTORY/FETCH_DONE': (state, action) => false
}, false);

const wasFetched = handleActions({
  'ARTICLE_HISTORY/FETCH_DONE': (state, action) => true,
  'LOG_OUT': (state, action) => false
}, false);

const articleHistory = combineReducers({
  byId,
  allIds,
  isFetching,
  wasFetched
});

export default articleHistory
