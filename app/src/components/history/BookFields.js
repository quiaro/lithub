import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import { ratingScale } from '../../common/utils';

const sliderStyle = {
  marginTop: 15,
  marginBottom: 10,
  marginLeft: '5%',
  marginRight: '5%',
  width: '90%'
};

// Min and max text values in the rating scale will be determined from
// the rating scale itself
const ratingScaleKeys = Object.keys(ratingScale);
const minRatingScaleText = ratingScale[ratingScaleKeys[0]];
const maxRatingScaleText = ratingScale[ratingScaleKeys[ratingScaleKeys.length - 1]];

const BookFields = ({
  onChange,
  onSliderChange,
  state,
  isEditing
}) => (
  <div className="book-fields">
    <TextField
      floatingLabelText="Title"
      fullWidth={true}
      name="title"
      errorText={state.errors.title}
      onChange={onChange}
      value={state.title}
      disabled={isEditing}
    />

    <TextField
      floatingLabelText="Author"
      fullWidth={true}
      name="author"
      errorText={state.errors.author}
      onChange={onChange}
      value={state.author}
      disabled={isEditing}
    />

    <div className="rating">
      <p>What rating would you give this book?</p>
      <Slider
        name="rating"
        min={1}
        max={5}
        step={1.0}
        value={state.rating}
        onChange={onSliderChange}
        sliderStyle={sliderStyle} />
      <div className="legend">
        <span>{minRatingScaleText}</span>
        <span>{maxRatingScaleText}</span>
      </div>
      <em>{state.ratingText}</em>
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
