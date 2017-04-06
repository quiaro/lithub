import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBookHistory } from '../../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BooksHistoryComponent from '../../components/history/Books'
import * as selectors from '../../reducers'

class BooksHistory extends Component {

  componentDidMount() {
    const { fetchBookHistory } = this.props;
    fetchBookHistory();
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
