import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import ArticleFields from './ArticleFields';

const buttonStyle = {
  marginLeft: 20
}

const AddArticleForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  history,
  state
}) => (
  <div className="container">
    <form onSubmit={onSubmit}>
      {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

        <ArticleFields onChange={onChange}
                       onSliderChange={onSliderChange}
                       state={state} />

      <div className='actions'>
        <RaisedButton type="submit" label="Done" primary={true} />
        <RaisedButton type="cancel"
                      label="Cancel"
                      style={buttonStyle}
                      onTouchTap={() => { history.push('/history/articles') }} />
      </div>
    </form>
  </div>
);

AddArticleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default AddArticleForm;
