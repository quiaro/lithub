import { combineReducers } from 'redux'
import articles, * as articleSelectors from './articles'
import books, * as bookSelectors from './books'
import quotes, * as quoteSelectors from './quotes'
import users, * as userSelectors from './users'
import isAuthenticated from './auth'

export const getAllArticles = (state) => {
  return articleSelectors.getAll(state.articles)
}

export const getIsFetchingArticles = (state) => {
  return articleSelectors.getIsFetching(state.articles)
}

export const getAllBooks = (state) => {
  return bookSelectors.getAll(state.books)
}

export const getIsFetchingBooks = (state) => {
  return bookSelectors.getIsFetching(state.books)
}

export const getAllQuotes = (state) => {
  return quoteSelectors.getAll(state.quotes)
}

export const getIsFetchingQuotes = (state) => {
  return quoteSelectors.getIsFetching(state.quotes)
}

export const getCurrentUser = (state) => {
  return userSelectors.getCurrentUser(state.users)
}

const reducers = combineReducers({
  isAuthenticated,
  books,
  articles,
  quotes,
  users
})

export default reducers
