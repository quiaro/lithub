import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

import { fetchArticle } from '../actions/articles';
import ArticleViewComponent from '../components/ArticleView'
import * as selectors from '../reducers'

class ArticleView extends Component {

  componentDidMount() {
    const { fetchArticle, match } = this.props;
    fetchArticle(match.params.id);
  }

  /**
   * Add an article read by others into the user's history
   * @param {object} article - article to add to history
   */
  addExisting(article) {
    const { history } = this.props;
    // Save article information in session storage to be retrieved afterwards
    sessionStorage.setItem('article', JSON.stringify(article));
    history.push(`/add/article?existing=true`);
  }

  render() {
    const { article, isFetchingArticle, history } = this.props;

    if (isFetchingArticle) {
      // Show progress bar if the article is being loaded
      return <LinearProgress />
    }
    return <ArticleViewComponent article={article}
                                 history={history}
                                 addExisting={this.addExisting.bind(this)} />
  }
}

const mapStateToProps = (state, props) => ({
  article: selectors.getArticle(state, props.match.params.id),
  isFetchingArticle: selectors.getIsFetchingArticle(state),
})

ArticleView = connect(mapStateToProps, { fetchArticle })(ArticleView)

export default ArticleView
