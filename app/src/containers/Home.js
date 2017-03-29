import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBooks } from '../actions';
import CircularProgress from 'material-ui/CircularProgress';
import HomeComponent from '../components/Home'
import * as selectors from '../reducers'

class Home extends Component {

  componentDidMount() {
    const { fetchBooks } = this.props;
    fetchBooks();
  }

  render() {
    const { isFetchingBooks } = this.props;

    if (isFetchingBooks) {
      return <CircularProgress size={60} thickness={7} />
    }

    return <HomeComponent {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  books: selectors.getAllBooks(state),
  isFetchingBooks: selectors.getIsFetchingBooks(state)
})

Home = connect(
  mapStateToProps,
  { fetchBooks }
)(Home)

export default Home
