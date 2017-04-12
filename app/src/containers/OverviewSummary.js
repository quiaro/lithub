import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLatestBooks } from '../actions/books';
import { fetchArticles } from '../actions/articles';
import { fetchQuotes } from '../actions/quotes';
import CircularProgress from 'material-ui/CircularProgress';
import OverviewSummaryComponent from '../components/OverviewSummary'
import * as selectors from '../reducers'

class OverviewSummary extends Component {

  componentDidMount() {
    const { fetchLatestBooks, fetchArticles, fetchQuotes } = this.props;
    fetchLatestBooks();
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
      return <CircularProgress className="loading-spinner" size={60} thickness={7} />
    }

    return <OverviewSummaryComponent {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  books: selectors.getLatestBooks(state),
  articles: selectors.getAllArticles(state),
  quotes: selectors.getAllQuotes(state),
  isFetchingBooks: selectors.getIsFetchingLatestBooks(state),
  isFetchingArticles: selectors.getIsFetchingArticles(state),
  isFetchingQuotes: selectors.getIsFetchingQuotes(state)
})

OverviewSummary = connect(
  mapStateToProps,
  { fetchLatestBooks, fetchArticles, fetchQuotes }
)(OverviewSummary)

export default OverviewSummary
