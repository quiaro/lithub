import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

import BookFields from '../forms/BookFields';

const buttonStyle = {
  marginLeft: 15
}

const EditBookForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  history,
  state
}) => {
  let body;
  if (!state._id) {
    body = (<div>Oops! We couldn't find the book you're looking for</div>);
  } else {
    body = (
      <div>
        <BookFields onChange={onChange}
                    onSliderChange={onSliderChange}
                    state={state} />
        <span className='record-date'>Entry recorded on: <i>{moment(state.last_modified).format('MMM D, YYYY')}</i></span>
      </div>
    );
  }

  return (
    <div className="my-book-edit">
      <Paper className="content">
        <h1>Book Detail</h1>
        <div className="container">
          <form onSubmit={onSubmit}>
            {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

            {body}

            <div className='actions'>
              <RaisedButton type="submit" label="Done" primary />
              <RaisedButton type="cancel"
                            label="Cancel"
                            style={buttonStyle}
                            onTouchTap={() => { history.push(`/history/books/${state._id}`) }} />
            </div>
          </form>
        </div>
      </Paper>
    </div>
  )
};

EditBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default EditBookForm;
