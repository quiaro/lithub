import { combineReducers } from 'redux'
import books, * as bookSelectors from './books'

export const getAllBooks = (state) => {
  return bookSelectors.getAll(state.books)
}

export const getIsFetchingBooks = (state) => {
  return bookSelectors.getIsFetching(state.books)
}

const reducers = combineReducers({
  books
})

export default reducers
