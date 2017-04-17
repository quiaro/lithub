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
 * Dictionary of quotes in the quote history (objects)
 */
const byId = handleActions({
  'QUOTE_HISTORY/FETCH_DONE': {
    next: (state, action) => (action.payload.entities.reviews || {})
  },
  [combineActions('QUOTE_HISTORY/ADD', 'QUOTE_HISTORY/EDIT')](state, action) {
    return {
      ...state,
      [action.payload.result]: review(state, action)
    };
  },
  'QUOTE_HISTORY/REMOVE': (state, action) => {
    // Remove key from copied state
    const newState = { ...state };
    delete newState[action.payload.result];
    return newState;
  },
  'LOG_OUT': (state, action) => ({})
}, {});

/*
 * Array of all quote IDs in the quote history
 */
const allIds = handleActions({
  'QUOTE_HISTORY/FETCH_DONE': {
    next: (state, action) => action.payload.result
  },
  'QUOTE_HISTORY/ADD': (state, action) => ([...state, action.payload.result]),
  'QUOTE_HISTORY/REMOVE': (state, action) => {
    // Return all ids minus the one of the review that is being deleted
    return state.filter(id => id !== action.payload.result);
  },
  'LOG_OUT': (state, action) => ([])
}, []);

const isFetching = handleActions({
  'QUOTE_HISTORY_FETCH': (state, action) => true,
  'QUOTE_HISTORY/FETCH_DONE': (state, action) => false
}, false);

const wasFetched = handleActions({
  'QUOTE_HISTORY/FETCH_DONE': (state, action) => true,
  'LOG_OUT': (state, action) => false
}, false);

const quoteHistory = combineReducers({
  byId,
  allIds,
  isFetching,
  wasFetched
});

export default quoteHistory
