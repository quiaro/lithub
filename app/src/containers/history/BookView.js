import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch, remove } from '../../actions/book-history';
import * as apiBookHistory from '../../api/book-history';
import CircularProgress from 'material-ui/CircularProgress';
import BookViewComponent from '../../components/history/BookView'
import * as selectors from '../../reducers'

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
    const { wasHistoryFetched, fetch } = this.props;

    if (!wasHistoryFetched) {
      fetch();
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
    const { book, remove, history } = this.props;
    apiBookHistory.remove(book).then(() => {
      // Dispatch action to delete book review from history
      remove(book);
      history.push('/history/books');
    })
  }

  render() {
    const { book, isFetchingHistory, history } = this.props;

    if (isFetchingHistory) {
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
  isFetchingHistory: selectors.getIsFetchingBookHistory(state),
  wasHistoryFetched: selectors.getWasBookHistoryFetched(state)
})

BookView = connect(
  mapStateToProps,
  { fetch, remove }
)(BookView)

export default BookView
