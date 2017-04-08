import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

import BookFields from '../forms/BookFields';

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
        <div className='record-date'>
          <span className='label'>Entry recorded on: <i>{moment(state.last_modified).format('MMM D, YYYY')}</i></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Book Detail</h1>
      <Card className="container">
        <form onSubmit={onSubmit}>
          {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

          {body}

          <RaisedButton type="submit" label="Done" primary />
          <RaisedButton type="cancel" label="Cancel" onTouchTap={() => { history.push(`/history/books/${state._id}`) }} />
        </form>
      </Card>
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
