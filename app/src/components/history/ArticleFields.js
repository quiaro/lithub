import React, { PropTypes } from 'react';
import unescape from 'validator/lib/unescape';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

const sliderStyle = {
  marginTop: 15,
  marginBottom: 10,
  marginLeft: '5%',
  marginRight: '5%',
  width: '90%'
}

const ArticleFields = ({
  onChange,
  onSliderChange,
  state
}) => (
  <div className="article-fields">
    <TextField
      floatingLabelText="Title"
      fullWidth={true}
      name="title"
      errorText={state.errors.title}
      onChange={onChange}
      value={unescape(state.title)}
    />

    <TextField
      floatingLabelText="Author"
      fullWidth={true}
      name="author"
      errorText={state.errors.author}
      onChange={onChange}
      value={state.author}
    />

    <TextField
      floatingLabelText="Link/URL"
      fullWidth={true}
      name="link"
      errorText={state.errors.link}
      onChange={onChange}
      value={state.link}
    />

    <div className="rating">
      <p>What rating would you give this article?</p>
      <Slider
        name="rating"
        min={0}
        max={10}
        step={1.0}
        value={state.rating}
        onChange={onSliderChange}
        sliderStyle={sliderStyle} />
      <div className="legend">
        <span>I don't like it</span>
        <span>I love it</span>
      </div>
    </div>

    <TextField
      hintText="Comments or thoughts on the article"
      fullWidth={true}
      multiLine={true}
      rows={3}
      rowsMax={10}
      onChange={onChange}
      name="comments"
      value={unescape(state.comments)} />
  </div>
);

ArticleFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default ArticleFields;
