import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

const BookFields = ({
  onChange,
  onSliderChange,
  state
}) => (
  <div className="book-fields">
    <TextField
      floatingLabelText="Title"
      fullWidth={true}
      name="title"
      errorText={state.errors.title}
      onChange={onChange}
      value={state.title}
    />

    <TextField
      floatingLabelText="Author"
      fullWidth={true}
      name="author"
      errorText={state.errors.author}
      onChange={onChange}
      value={state.author}
    />

    <div>
      <p>What rating would you give this book?</p>
      <Slider
        name="rating"
        min={0}
        max={10}
        step={1.0}
        value={state.rating}
        onChange={onSliderChange} />
      <span>I don't like it</span>
      <span>I love it</span>
    </div>

    <TextField
      hintText="Comments or thoughts on the book"
      fullWidth={true}
      multiLine={true}
      rows={3}
      rowsMax={10}
      onChange={onChange}
      name="comments"
      value={state.comments} />
  </div>
);

BookFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default BookFields;
