import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

import { fetchBook } from '../actions/books';
import BookViewComponent from '../components/BookView'
import * as selectors from '../reducers'

class BookView extends Component {

  componentDidMount() {
    const { fetchBook, match } = this.props;
    fetchBook(match.params.id);
  }

  render() {
    const { book, isFetchingBook, history } = this.props;

    if (isFetchingBook) {
      // Show progress bar if the book is being loaded
      return <LinearProgress />
    }
    return <BookViewComponent book={book}
                              history={history} />
  }
}

const mapStateToProps = (state, props) => ({
  book: selectors.getBook(state, props.match.params.id),
  isFetchingBook: selectors.getIsFetchingBook(state),
})

BookView = connect(
  mapStateToProps,
  { fetchBook }
)(BookView)

export default BookView
