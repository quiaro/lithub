import { combineReducers } from 'redux'
import articles, * as articleSelectors from './articles'
import books, * as bookSelectors from './books'
import quotes, * as quoteSelectors from './quotes'
import isAuthenticated from './auth'
import currentUser from './currentUser'

export const getAllArticles = (state) => articleSelectors.getAll(state.articles);
export const getIsFetchingArticles = (state) => articleSelectors.getIsFetching(state.articles);

export const getAllBooksReadByOthers = (state) => bookSelectors.getAllReadByOthers(state.books);
export const getIsFetchingBooksReadByOthers = (state) => bookSelectors.getIsFetchingReadByOthers(state.books);
export const getAllBooksHistory = (state) => bookSelectors.getAllHistory(state.books);
export const getIsFetchingBooksHistory = (state) => bookSelectors.getIsFetchingHistory(state.books);
export const getWasHistoryFetched = (state) => bookSelectors.getWasHistoryFetched(state.books);
export const getBookFromHistory = (state, id) => bookSelectors.getBook(state.books, id);

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
  articles,
  quotes
})

export default reducers
