import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import quote from './quote';
/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);
export const get = (state, id) => state.byId[id];
export const getLatest = (state) => state.latestAllIds.map(id => state.latestById[id]);
export const getIsFetchingQuote = (state) => state.isFetchingQuote;
export const getIsFetchingQuotes = (state) => state.isFetching;
export const getIsFetchingLatest = (state) => state.isFetchingLatest;
export const getQuotesNextIndex = (state) => state.quotesNextIndex;

/*
 * ----- REDUCERS
 */

/*
 * === Quotes Read by Others
 */
const byId = handleActions({
  'QUOTES/FETCH_DONE': (state, action) => {
    // Merge in the result to the previous state
    return Object.assign({}, state, action.payload.entities.quotes);
  },
  // When the API fetches quotes read by others, these won't include all
  // the review details. When a specific quote is fetched, these details will
  // be included. The previous quote object in the state will be substituted
  // with this detailed one.
  'QUOTE/FETCH_DONE': (state, action) => ({
      ...state,
      [action.payload.result]: quote(state, action)
    }),
  'RESET_QUOTES': (state, action) => ({})
}, {});

const allIds = handleActions({
  'QUOTES/FETCH_DONE': (state, action) => {
    // Merge in the result to the previous state
    return state.concat(action.payload.result);
  },
  'QUOTE/FETCH_DONE': (state, action) => {
    // Do not add key if it already exists
    const result = new Set([...state, action.payload.result]);
    return [...result];
  },
  'RESET_QUOTES': (state, action) => ([])
}, []);

const quotesNextIndex = handleActions({
  'QUOTES/FETCH_DONE': (state, action) => {
    // If the previous next index is the same as the current next index
    // then that means there are no more results to fetch, in which case
    // the state becomes -1.
    return (state !== action.meta.start) ?
       action.meta.start : -1;
  },
  'RESET_QUOTES': (state, action) => 0
}, 0)

const isFetching = handleActions({
  'QUOTES_FETCH': (state, action) => true,
  'QUOTES/FETCH_DONE': (state, action) => false
}, false);

const isFetchingQuote = handleActions({
  'QUOTE_FETCH': (state, action) => true,
  'QUOTE/FETCH_DONE': (state, action) => false
}, false);

/*
 * === Latest Quotes
 */
const latestById = handleAction('QUOTES/LATEST_FETCH_DONE',
  (state, action) => (action.payload.entities.quotes || {}), {});

const latestAllIds = handleAction('QUOTES/LATEST_FETCH_DONE',
  (state, action) => action.payload.result, []);

const isFetchingLatest = handleActions({
  'QUOTES_LATEST_FETCH': (state, action) => true,
  'QUOTES/LATEST_FETCH_DONE': (state, action) => false
}, false);


const quotes = combineReducers({
  byId,
  allIds,
  quotesNextIndex,
  isFetching,
  isFetchingQuote,
  isFetchingLatest,
  latestById,
  latestAllIds
});

export default quotes
