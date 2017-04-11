import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReadByOthers } from '../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BooksByOthersComponent from '../components/BooksByOthers'
import * as selectors from '../reducers'

class BooksByOthers extends Component {

  componentDidMount() {
    const { fetchReadByOthers } = this.props;

    // Every time the component is mounted, a request is made to fetch
    // all the books read by others
    fetchReadByOthers();
  }

  render() {
    const { books, isFetchingBooksReadByOthers, history } = this.props;

    return (
      <div>
        <BooksByOthersComponent books={books} history={history} />
        {isFetchingBooksReadByOthers && <CircularProgress size={60} thickness={7} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  books: selectors.getAllBooksReadByOthers(state),
  isFetchingBooksReadByOthers: selectors.getIsFetchingBooksReadByOthers(state)
})

BooksByOthers = connect(
  mapStateToProps,
  { fetchReadByOthers }
)(BooksByOthers)

export default BooksByOthers
