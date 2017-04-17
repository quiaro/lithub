import React from 'react';
import unescape from 'validator/lib/unescape';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import moment from 'moment';

const buttonStyle = {
  marginLeft: 15
}

const QuoteView = ({ quote, history }) => {
  let body;
  if (!quote) {
    body = (<div>Oops! We couldn't find the quote you're looking for</div>);
  } else {
    body = (
      <div>
        <div className='actions'>
          <RaisedButton label="Back to Quote Listing"
                        primary={true}
                        onTouchTap={() => { history.push('/quotes') }} />
          <RaisedButton label="Add To Favorites"
                        primary={true}
                        style={buttonStyle}
                        onTouchTap={() => { history.push(`/add/quote`) }} />
        </div>

        <main>
          <section className='details'>
            <div className='title'>
              <b>Quote</b>
              <span>{quote.quote}</span>
            </div>
            <div className='author'>
              <b>Author</b>
              <span>{quote.author}</span>
            </div>
            <span className='record-date'>Last modified on: <i>{moment(quote.last_modified).format('MMM D, YYYY')}</i></span>
          </section>

          <section className='comments'>
            <h2>Comments</h2>
            {quote.reviews.map( (review, index) => (
              review && review.comments ?
                (<div key={index} className='review'>
                  <span className='date'>On {moment(review.last_modified).format('MMM D, YYYY')}</span>
                  <blockquote>{unescape(review.comments)}</blockquote>
                </div>) : null
            )) }
          </section>
        </main>

          {/* If there are more than 10 comments show action buttons at the bottom too so the
          user doesn't have to scroll up */}

          {quote.reviews.length > 10 &&
            <div className='actions'>
              <RaisedButton label="Back to Quote Listing"
                            primary={true}
                            onTouchTap={() => { history.push('/quotes') }} />
              <RaisedButton label="Add To Favorites"
                            primary={true}
                            style={buttonStyle}
                            onTouchTap={() => { history.push(`/add/quote`) }} />
            </div>
          }
      </div>
    );
  }

  return (
    <Paper className="others-detail">
      <h1>Quote Detail</h1>
      {body}
    </Paper>
  )
}

export default QuoteView;
