import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBooks } from '../actions/books';
import { fetchArticles } from '../actions/articles';
import { fetchQuotes } from '../actions/quotes';
import CircularProgress from 'material-ui/CircularProgress';
import PublicSummaryComponent from '../components/PublicSummary'
import * as selectors from '../reducers'

class PublicSummary extends Component {

  componentDidMount() {
    const { fetchBooks, fetchArticles, fetchQuotes } = this.props;
    fetchBooks();
    fetchArticles();
    fetchQuotes();
  }

  render() {
    const {
      isFetchingBooks,
      isFetchingArticles,
      isFetchingQuotes,
    } = this.props;

    if (isFetchingBooks || isFetchingArticles || isFetchingQuotes) {
      return <CircularProgress size={60} thickness={7} />
    }

    return <PublicSummaryComponent {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  books: selectors.getAllBooks(state),
  articles: selectors.getAllArticles(state),
  quotes: selectors.getAllQuotes(state),
  isFetchingBooks: selectors.getIsFetchingBooks(state),
  isFetchingArticles: selectors.getIsFetchingArticles(state),
  isFetchingQuotes: selectors.getIsFetchingQuotes(state)
})

PublicSummary = connect(
  mapStateToProps,
  { fetchBooks, fetchArticles, fetchQuotes }
)(PublicSummary)

export default PublicSummary
