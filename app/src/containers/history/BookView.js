import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBookHistory, deleteBookFromHistory } from '../../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BookViewComponent from '../../components/history/BookView'
import * as selectors from '../../reducers'
import * as apiBooks from '../../api/books';

class BookView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleteDialogOpen: false
    }
    this.onDialogOpenHandler = this.onDialogOpenHandler.bind(this);
    this.onDialogCloseHandler = this.onDialogCloseHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  componentDidMount() {
    const { wasHistoryFetched, fetchBookHistory } = this.props;

    if (!wasHistoryFetched) {
      fetchBookHistory();
    }
  }

  // Delete Dialog
  onDialogOpenHandler() {
    this.setState({ isDeleteDialogOpen: true });
  }
  onDialogCloseHandler() {
    this.setState({ isDeleteDialogOpen: false })
  }

  onDeleteHandler() {
    const { book, deleteBookFromHistory, history } = this.props;
    apiBooks.deleteBookFromHistory(book).then(() => {
      // Dispatch action to delete book review from history
      deleteBookFromHistory(book);
      history.push('/history/books');
    })
  }

  render() {
    const { book, isFetchingBooksHistory, history } = this.props;

    if (isFetchingBooksHistory) {
      // Show loading spinner if the book history is being loaded
      return <CircularProgress size={60} thickness={7} />
    }
    return <BookViewComponent book={book}
                              history={history}
                              isDeleteDialogOpen={this.state.isDeleteDialogOpen}
                              onOpenDeleteDialog={this.onDialogOpenHandler}
                              onCloseDeleteDialog={this.onDialogCloseHandler}
                              onDelete={this.onDeleteHandler} />
  }
}

const mapStateToProps = (state, props) => ({
  book: selectors.getBookFromHistory(state, props.match.params.id),
  isFetchingBooksHistory: selectors.getIsFetchingBooksHistory(state),
  wasHistoryFetched: selectors.getWasHistoryFetched(state)
})

BookView = connect(
  mapStateToProps,
  { fetchBookHistory, deleteBookFromHistory }
)(BookView)

export default BookView
