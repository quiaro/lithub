import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

const BookView = ({ book, history }) => {
  let body;
  if (!book) {
    body = (<div>Oops! We couldn't find the book you're looking for</div>);
  } else {
    body = (
      <div>
        <div className='actions'>
          <RaisedButton label="Edit"
                        primary={true}
                        onTouchTap={() => { history.push(`/history/books/${book._id}/edit`) }} />
        </div>
        <div className='details'>
          <div className='title'>
            <span className='label'>Title</span>
            <span className='value'>{book.title}</span>
          </div>
          <div className='author'>
            <span className='label'>Author</span>
            <span className='value'>{book.author}</span>
          </div>
          <div className='review'>
            <span className='rating'>{book.rating}</span>
            {book.comments && <span className='value'>{book.comments}</span>}
          </div>
          <div className='record-date'>
            <span className='label'>Entry recorded on: <i>{moment(book.last_modified).format('MMM D, YYYY')}</i></span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Book Detail</h1>
      {body}
      <RaisedButton label="Back to History" primary={true} onTouchTap={() => { history.push('/history/books') }} />
    </div>
  )
}

export default BookView;
