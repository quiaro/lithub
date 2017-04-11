import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

const BookView = ({ book, history }) => {
  let body;
  if (!book) {
    body = (<div>Oops! We couldn't find the book you're looking for</div>);
  } else {
    const url_title = encodeURIComponent(book.title);
    const url_author = encodeURIComponent(book.author);
    body = (
      <div>
        <div className='actions'>
          <RaisedButton label="Back to Book Listing"
                        primary={true}
                        onTouchTap={() => { history.push('/books') }} />
          <RaisedButton label="Add To My History"
                        primary={true}
                        onTouchTap={() => { history.push(`/add/book?title=${url_title}&author=${url_author}`) }} />
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
          <div className='record-date'>
            <span className='label'>Last modified on: <i>{moment(book.last_modified).format('MMM D, YYYY')}</i></span>
          </div>
          {book.reviews.map( (review, index) => (
            review ?
              (<div key={index} className='review'>
                <span className='rating'>{review.rating}</span>
                {review.comments && <span className='value'>{review.comments}</span>}
              </div>) : null
          )) }
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Book Detail</h1>
      {body}
      <RaisedButton label="Back to Book Listing" primary={true} onTouchTap={() => { history.push('/books') }} />
    </div>
  )
}

export default BookView;
