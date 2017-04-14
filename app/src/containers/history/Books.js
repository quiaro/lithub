import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../actions/book-history';
import CircularProgress from 'material-ui/CircularProgress';
import BooksHistoryComponent from '../../components/history/Books'
import * as selectors from '../../reducers'

class BooksHistory extends Component {

  componentDidMount() {
    const { wasHistoryFetched, fetch } = this.props;

    // If the book history has already been fetched, the history will be kept up
    // to date with each subsequent post, put and delete made. This avoids
    // having to make a new request each time. It's possible to do this because
    // we know that only the user is allowed to modify her own history.
    if (!wasHistoryFetched) {
      fetch();
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
  books: selectors.getAllBookHistory(state),
  isFetchingBooksHistory: selectors.getIsFetchingBookHistory(state),
  wasHistoryFetched: selectors.getWasBookHistoryFetched(state)
})

BooksHistory = connect(
  mapStateToProps,
  { fetch }
)(BooksHistory)

export default BooksHistory
