import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBooks } from '../actions/books';
import { fetchArticles } from '../actions/articles';
import CircularProgress from 'material-ui/CircularProgress';
import HomeComponent from '../components/Home'
import * as selectors from '../reducers'

class Home extends Component {

  componentDidMount() {
    const { fetchBooks, fetchArticles } = this.props;
    fetchBooks();
    fetchArticles();
  }

  render() {
    const { isFetchingBooks, isFetchingArticles } = this.props;

    if (isFetchingBooks || isFetchingArticles) {
      return <CircularProgress size={60} thickness={7} />
    }

    return <HomeComponent {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  books: selectors.getAllBooks(state),
  articles: selectors.getAllArticles(state),
  isFetchingBooks: selectors.getIsFetchingBooks(state),
  isFetchingArticles: selectors.getIsFetchingArticles(state)
})

Home = connect(
  mapStateToProps,
  { fetchBooks, fetchArticles }
)(Home)

export default Home
