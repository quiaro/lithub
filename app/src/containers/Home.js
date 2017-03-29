import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBooks } from '../actions/books';
import { fetchArticles } from '../actions/articles';
import { fetchQuotes } from '../actions/quotes';
import CircularProgress from 'material-ui/CircularProgress';
import HomeComponent from '../components/Home'
import * as selectors from '../reducers'

class Home extends Component {

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

    return <HomeComponent {...this.props} />
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

Home = connect(
  mapStateToProps,
  { fetchBooks, fetchArticles, fetchQuotes }
)(Home)

export default Home
