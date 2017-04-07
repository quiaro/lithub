import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBookHistory } from '../../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BooksHistoryComponent from '../../components/history/Books'
import * as selectors from '../../reducers'

class BooksHistory extends Component {

  componentDidMount() {
    const { wasHistoryFetched, fetchBookHistory } = this.props;

    // If the book history has already been fetched, the history will be kept up
    // to date with each subsequent post, put and delete made. This avoids
    // having to make a new request each time. It's possible to do this because
    // we know that only the user is allowed to modify her own history.
    if (!wasHistoryFetched) {
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
  isFetchingBooksHistory: selectors.getIsFetchingBooksHistory(state),
  wasHistoryFetched: selectors.getWasHistoryFetched(state)
})

BooksHistory = connect(
  mapStateToProps,
  { fetchBookHistory }
)(BooksHistory)

export default BooksHistory
