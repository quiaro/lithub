import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReadByOthers, resetBooks } from '../actions/books';
import CircularProgress from 'material-ui/CircularProgress';
import BooksByOthersComponent from '../components/BooksByOthers'
import * as selectors from '../reducers'

class BooksByOthers extends Component {

  constructor(props) {
    super(props);
    this.isScrolling = false;

    // Fetch more data on scroll
    this.monitorScroll = function(e) {
      if (!this.isScrolling) {
        // Scroll optimization with window.requestAnimationFrame
        // per: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
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
    }.bind(this);

    this.addExisting = this.addExisting.bind(this);
  }

  componentDidMount() {
    const { fetchReadByOthers } = this.props;

    // Every time the component is mounted, a request is made to fetch
    // all the books read by others
    fetchReadByOthers();
    window.addEventListener('scroll', this.monitorScroll);
  }

  componentWillUnmount() {
    const { resetBooks } = this.props;

    // Every time the component is unmounted, clear the book list
    // by other users so that when it is mounted again results won't
    // be stale.
    resetBooks();
    window.removeEventListener('scroll', this.monitorScroll);
  }

  /**
   * Add a book read by others into the user's history
   * @param {object} book - book to add to history
   */
  addExisting(book) {
    const { history } = this.props;
    // Save book information in session storage to be retrieved afterwards
    sessionStorage.setItem('book', JSON.stringify(book));
    history.push(`/add/book?existing=true`);
  }

  render() {
    const { books, isFetchingBooksReadByOthers, history } = this.props;

    return (
      <div>
        <BooksByOthersComponent books={books} history={history} addExisting={this.addExisting} />
        {isFetchingBooksReadByOthers && <CircularProgress size={60} thickness={7} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  books: selectors.getAllBooksReadByOthers(state),
  isFetchingBooksReadByOthers: selectors.getIsFetchingBooksReadByOthers(state),
  booksNextIndex: selectors.getBooksNextIndex(state)
})

BooksByOthers = connect(
  mapStateToProps,
  { fetchReadByOthers, resetBooks }
)(BooksByOthers)

export default BooksByOthers
