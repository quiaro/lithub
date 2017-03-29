import { combineReducers } from 'redux'
import articles, * as articleSelectors from './articles'
import books, * as bookSelectors from './books'

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

const reducers = combineReducers({
  books,
  articles
})

export default reducers
