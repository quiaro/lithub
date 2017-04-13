import React from 'react';
import unescape from 'validator/lib/unescape';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import moment from 'moment';

const buttonStyle = {
  marginLeft: 15
}

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
                        style={buttonStyle}
                        onTouchTap={() => { history.push(`/add/book?title=${url_title}&author=${url_author}`) }} />
        </div>

        <main>
          <section className='details'>
            <div className='title'>
              <b>Title</b>
              <span>{book.title}</span>
            </div>
            <div className='author'>
              <b>Author</b>
              <span>{book.author}</span>
            </div>
            <span className='record-date'>Last modified on: <i>{moment(book.last_modified).format('MMM D, YYYY')}</i></span>
          </section>

          <section className='comments'>
            <h2>Comments</h2>
            {book.reviews.map( (review, index) => (
              review ?
                (<div key={index} className='review'>
                  <span className='date'>On {moment(review.last_modified).format('MMM D, YYYY')}</span>
                  <span className='rating'>{review.rating}</span>
                  {review.comments && <blockquote>{unescape(review.comments)}</blockquote>}
                </div>) : null
            )) }
          </section>
        </main>

          {/* If there are more than 10 comments show action buttons at the bottom too so the
          user doesn't have to scroll up */}

          {book.reviews.length > 10 &&
            <div className='actions'>
              <RaisedButton label="Back to Book Listing"
                            primary={true}
                            onTouchTap={() => { history.push('/books') }} />
              <RaisedButton label="Add To My History"
                            primary={true}
                            style={buttonStyle}
                            onTouchTap={() => { history.push(`/add/book?title=${url_title}&author=${url_author}`) }} />
            </div>
          }
      </div>
    );
  }

  return (
    <Paper className="others-detail">
      <h1>Book Detail</h1>
      {body}
    </Paper>
  )
}

export default BookView;
