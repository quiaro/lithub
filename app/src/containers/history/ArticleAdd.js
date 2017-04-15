import React from 'react';
import { connect } from 'react-redux';

import withArticleForm from './withArticleForm';
import { add } from '../../actions/article-history';
import AddArticleForm from '../../components/history/ArticleAdd';
import { getQueryParam } from '../../common/utils';

class AddArticle extends React.Component {

  constructor(props) {
    super(props);

    const searchUrl = props.history.location.search;
    const title = getQueryParam(searchUrl, 'title') || '';
    const author = getQueryParam(searchUrl, 'author') || '';

    this.state = {
      errors: {},
      title: title,
      author: author,
      link: '',
      rating: 5,
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
