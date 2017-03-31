import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

const AddBookForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  errors,
  book
}) => (
  <Card className="container">
    <form onSubmit={onSubmit}>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

        <TextField
          floatingLabelText="Title"
          fullWidth={true}
          name="title"
          errorText={errors.title}
          onChange={onChange}
          value={book.title}
        />

        <TextField
          floatingLabelText="Author"
          fullWidth={true}
          name="author"
          errorText={errors.author}
          onChange={onChange}
          value={book.author}
        />

        <div>
          <p>What rating would you give this book?</p>
          <Slider
            name="rating"
            min={0}
            max={10}
            step={1.0}
            value={book.rating}
            onChange={onSliderChange} />
          <span>I didn't like it</span>
          <span>I loved it</span>
        </div>

        <TextField
          hintText="Comments or thoughts on the book"
          fullWidth={true}
          multiLine={true}
          rows={3}
          rowsMax={10} />

      <RaisedButton type="submit" label="Done" primary />
      <RaisedButton type="cancel" label="Cancel" />
    </form>
  </Card>
);

AddBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired
};

export default AddBookForm;
