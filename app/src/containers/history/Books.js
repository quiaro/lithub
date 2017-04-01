import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBooksHistory } from '../../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BooksHistoryComponent from '../../components/history/Books'
import * as selectors from '../../reducers'

class BooksHistory extends Component {

  componentDidMount() {
    const { fetchBooksHistory } = this.props;
    fetchBooksHistory();
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
  { fetchBooksHistory }
)(BooksHistory)

export default BooksHistory
