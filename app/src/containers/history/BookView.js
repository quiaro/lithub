import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBookHistory } from '../../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BookViewComponent from '../../components/history/BookView'
import * as selectors from '../../reducers'

class BookView extends Component {

  componentDidMount() {
    const { wasHistoryFetched, fetchBookHistory } = this.props;

    if (!wasHistoryFetched) {
      fetchBookHistory();
    }
  }

  render() {
    const { book, isFetchingBooksHistory, history } = this.props;

    if (isFetchingBooksHistory) {
      // Show loading spinner if the book history is being loaded
      return <CircularProgress size={60} thickness={7} />
    }
    return <BookViewComponent book={book} history={history} />
  }
}

const mapStateToProps = (state, props) => ({
  book: selectors.getBookFromHistory(state, props.match.params.id),
  isFetchingBooksHistory: selectors.getIsFetchingBooksHistory(state),
  wasHistoryFetched: selectors.getWasHistoryFetched(state)
})

BookView = connect(
  mapStateToProps,
  { fetchBookHistory }
)(BookView)

export default BookView
