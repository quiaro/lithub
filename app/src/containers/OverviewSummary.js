import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLatestBooks } from '../actions/books';
import { fetchLatestArticles } from '../actions/articles';
import { fetchQuotes } from '../actions/quotes';
import CircularProgress from 'material-ui/CircularProgress';
import OverviewSummaryComponent from '../components/OverviewSummary'
import * as selectors from '../reducers'

class OverviewSummary extends Component {

  componentDidMount() {
    const { fetchLatestBooks, fetchLatestArticles, fetchQuotes } = this.props;
    fetchLatestBooks();
    fetchLatestArticles();
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
  articles: selectors.getLatestArticles(state),
  quotes: selectors.getAllQuotes(state),
  isFetchingBooks: selectors.getIsFetchingLatestBooks(state),
  isFetchingArticles: selectors.getIsFetchingLatestArticles(state),
  isFetchingQuotes: selectors.getIsFetchingQuotes(state)
})

OverviewSummary = connect(
  mapStateToProps,
  { fetchLatestBooks, fetchLatestArticles, fetchQuotes }
)(OverviewSummary)

export default OverviewSummary
