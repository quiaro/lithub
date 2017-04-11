import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReadByOthers } from '../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BooksByOthersComponent from '../components/BooksByOthers'
import * as selectors from '../reducers'

class BooksByOthers extends Component {

  constructor(props) {
    super(props);
    this.isScrolling = false;
  }

  componentDidMount() {
    const { fetchReadByOthers } = this.props;

    // Every time the component is mounted, a request is made to fetch
    // all the books read by others
    fetchReadByOthers();

    window.addEventListener('scroll', this.monitorScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.monitorScroll);
  }

  monitorScroll(e) {
    if (!this.isScrolling) {
      window.requestAnimationFrame(() => {
        const htmlEl = document.querySelector('html');
        const bodyEl = document.querySelector('body');

        // If the user has scrolled past 80% of the body's scroll height
        // (total height including overflow), then we'll make a request to
        // fetch more books
        const threshold = Math.round(bodyEl.scrollHeight * 0.8);
        if (htmlEl.clientHeight + bodyEl.scrollTop > threshold) {
          const { fetchReadByOthers, isFetchingBooksReadByOthers, booksNextIndex } = this.props;

          // Make sure a request hasn't already been made before making
          // another request
          if (!isFetchingBooksReadByOthers) {
            fetchReadByOthers(booksNextIndex);
          }
        }
        this.isScrolling = false;
      });
    }
    this.isScrolling = true;
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
  isFetchingBooksReadByOthers: selectors.getIsFetchingBooksReadByOthers(state),
  booksNextIndex: selectors.getReadByOthersNextIndex(state)
})

BooksByOthers = connect(
  mapStateToProps,
  { fetchReadByOthers }
)(BooksByOthers)

export default BooksByOthers
