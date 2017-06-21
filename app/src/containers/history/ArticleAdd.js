import React from 'react';
import { connect } from 'react-redux';
import unescape from 'validator/lib/unescape';

import withArticleForm from './withArticleForm';
import { add } from '../../actions/article-history';
import AddArticleForm from '../../components/history/ArticleAdd';
import { getQueryParam, ratingScale } from '../../common/utils';

class AddArticle extends React.Component {

  constructor(props) {
    super(props);

    const searchUrl = props.history.location.search;
    const isExisting = getQueryParam(searchUrl, 'existing');
    let article = isExisting ? sessionStorage.getItem('article') : null;
    if (article) {
      article = JSON.parse(article);
    }
    // Select the value in the middle of the rating scale
    const ratingDefaultValue = Math.round(Object.keys(ratingScale).length / 2);

    this.state = {
      errors: {},
      title: article ? unescape(article.title) : '',
      author: article ? article.author : '',
      link: article ? article.link : '',
      rating: ratingDefaultValue,
      ratingText: ratingScale[ratingDefaultValue],
      comments: ''
    }
    // Bind the methods from the HOC to this class so they alter this
    // class' state
    this.processForm = this.props.processForm.bind(this);
    this.updateForm = this.props.updateForm.bind(this);
    this.updateRating = this.props.updateRating.bind(this);
    this.validateForm = this.props.validateForm.bind(this);
  }

  /**
   * Render the component.
   */
  render() {
    const { history } = this.props;

    return (<AddArticleForm onSubmit={this.processForm}
                            onChange={this.updateForm}
                            onSliderChange={this.updateRating}
                            history={history}
                            state={this.state} />);
  }
}

AddArticle = connect(undefined, { add })(AddArticle);
AddArticle = withArticleForm(AddArticle, 'add');

export default AddArticle;
