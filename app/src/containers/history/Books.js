import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBookHistory } from '../../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BooksHistoryComponent from '../../components/history/Books'
import * as selectors from '../../reducers'

class BooksHistory extends Component {

  componentDidMount() {
    const { books, fetchBookHistory } = this.props;

    // If there are books in the user's history, we'll assume that the book
    // history has already been fetched and that the history will be kept up
    // to date with each subsequent post, put and delete made. This avoids
    // having to make a new request each time. It's possible to do this because
    // we know that only the user is allowed to modify her own history.
    if (!books.length) {
      fetchBookHistory();
    }
  }

  render() {
    const { books, isFetchingBooksHistory, history } = this.props;

    if (isFetchingBooksHistory) {
      return <CircularProgress size={60} thickness={7} />
    }
    return <BooksHistoryComponent books={books} history={history} />
  }
}

const mapStateToProps = (state) => ({
  books: selectors.getAllBooksHistory(state),
  isFetchingBooksHistory: selectors.getIsFetchingBooksHistory(state)
})

BooksHistory = connect(
  mapStateToProps,
  { fetchBookHistory }
)(BooksHistory)

export default BooksHistory
