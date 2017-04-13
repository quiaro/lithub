import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

const AddArticleForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  errors,
  article
}) => (
  <div className="container">
    <form onSubmit={onSubmit}>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

        <TextField
          floatingLabelText="Title"
          fullWidth={true}
          name="title"
          errorText={errors.title}
          onChange={onChange}
          value={article.title}
        />

        <TextField
          floatingLabelText="Author"
          fullWidth={true}
          name="author"
          errorText={errors.author}
          onChange={onChange}
          value={article.author}
        />

        <TextField
          floatingLabelText="Link/URL"
          fullWidth={true}
          name="link"
          errorText={errors.link}
          onChange={onChange}
          value={article.link}
        />

        <div>
          <p>What rating would you give this article?</p>
          <Slider
            name="rating"
            min={0}
            max={10}
            step={1.0}
            value={article.rating}
            onChange={onSliderChange} />
          <span>I don't like it</span>
          <span>I love it</span>
        </div>

        <TextField
          hintText="Comments or thoughts on the article"
          fullWidth={true}
          multiLine={true}
          rows={3}
          rowsMax={10} />

      <RaisedButton type="submit" label="Done" primary />
      <RaisedButton type="cancel" label="Cancel" />
    </form>
  </div>
);

AddArticleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired
};

export default AddArticleForm;
