import { combineReducers } from 'redux'
import books, * as bookSelectors from './books/books'
import bookHistory, * as bookHistorySelectors from './books/history'
import articles, * as articleSelectors from './articles/articles'
import articleHistory, * as articleHistorySelectors from './articles/history'

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

// --- ARTICLES
export const getAllArticlesReadByOthers = (state) => articleSelectors.getAll(state.articles);
export const getArticle = (state, id) => articleSelectors.get(state.articles, id);
export const getLatestArticles = (state) => articleSelectors.getLatest(state.articles);
export const getIsFetchingArticle = (state) => articleSelectors.getIsFetchingArticle(state.articles);
export const getIsFetchingArticlesReadByOthers = (state) => articleSelectors.getIsFetchingArticles(state.articles);
export const getIsFetchingLatestArticles = (state) => articleSelectors.getIsFetchingLatest(state.articles);
export const getArticlesNextIndex = (state) => articleSelectors.getArticlesNextIndex(state.articles);

// --- ARTICLE HISTORY
export const getAllArticleHistory = (state) => articleHistorySelectors.getAll(state.articleHistory);
export const getArticleFromHistory = (state, id) => articleHistorySelectors.get(state.articleHistory, id);
export const getIsFetchingArticleHistory = (state) => articleHistorySelectors.getIsFetching(state.articleHistory);
export const getWasArticleHistoryFetched = (state) => articleHistorySelectors.getWasFetched(state.articleHistory);


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
  articleHistory,
  quotes
})

export default reducers
