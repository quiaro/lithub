import { combineReducers } from 'redux'
import books, * as bookSelectors from './books/books'
import bookHistory, * as bookHistorySelectors from './books/history'
import articles, * as articleSelectors from './articles'
import quotes, * as quoteSelectors from './quotes'
import isAuthenticated from './auth'
import currentUser from './currentUser'

// --- BOOKS
export const getAllBooksReadByOthers = (state) => bookSelectors.getAll(state.books);
export const getBook = (state, id) => bookSelectors.get(state.books, id);
export const getLatestBooks = (state) => bookSelectors.getLatest(state.books);
export const getIsFetchingBook = (state) => bookSelectors.getIsFetchingBook(state.books);
export const getIsFetchingBooksReadByOthers = (state) => bookSelectors.getIsFetchingBooks(state.books);
export const getIsFetchingLatestBooks = (state) => bookSelectors.getIsFetchingLatest(state.books);
export const getBooksNextIndex = (state) => bookSelectors.getBooksNextIndex(state.books);

// --- BOOK HISTORY
export const getAllBookHistory = (state) => bookHistorySelectors.getAll(state.bookHistory);
export const getBookFromHistory = (state, id) => bookHistorySelectors.get(state.bookHistory, id);
export const getIsFetchingBookHistory = (state) => bookHistorySelectors.getIsFetching(state.bookHistory);
export const getWasBookHistoryFetched = (state) => bookHistorySelectors.getWasFetched(state.bookHistory);


export const getAllArticles = (state) => articleSelectors.getAll(state.articles);
export const getIsFetchingArticles = (state) => articleSelectors.getIsFetching(state.articles);

export const getAllArticlesHistory = (state) => articleSelectors.getAllHistory(state.articles);
export const getIsFetchingArticlesHistory = (state) => articleSelectors.getIsFetchingHistory(state.articles);

export const getAllQuotes = (state) => quoteSelectors.getAll(state.quotes);
export const getIsFetchingQuotes = (state) => quoteSelectors.getIsFetching(state.quotes);

export const getAllQuotesHistory = (state) => quoteSelectors.getAllHistory(state.quotes);
export const getIsFetchingQuotesHistory = (state) => quoteSelectors.getIsFetchingHistory(state.quotes);

const reducers = combineReducers({
  isAuthenticated,
  currentUser,
  books,
  bookHistory,
  articles,
  quotes
})

export default reducers
