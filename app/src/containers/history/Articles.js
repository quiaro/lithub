import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchArticlesHistory } from '../../actions/articles';
import CircularProgress from 'material-ui/CircularProgress';
import ArticlesHistoryComponent from '../../components/history/Articles'
import * as selectors from '../../reducers'

class ArticlesHistory extends Component {

  componentDidMount() {
    const { fetchArticlesHistory } = this.props;
    fetchArticlesHistory();
  }

  render() {
    const { articles, isFetchingArticlesHistory, history } = this.props;

    if (isFetchingArticlesHistory) {
      return <CircularProgress size={60} thickness={7} />
    }
    return <ArticlesHistoryComponent articles={articles} history={history} />
  }
}

const mapStateToProps = (state) => ({
  articles: selectors.getAllArticlesHistory(state),
  isFetchingArticlesHistory: selectors.getIsFetchingArticlesHistory(state)
})

ArticlesHistory = connect(
  mapStateToProps,
  { fetchArticlesHistory }
)(ArticlesHistory)

export default ArticlesHistory
