import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const OverviewSummary = ({ books, history }) => {

  const booksData = books.map(b => {
    const totalRating = b.reviews.reduce((acc, obj) => acc + obj.rating, 0);
    const totalReviewers = b.reviews.length;
    let avgRating = totalRating / totalReviewers;

    avgRating = Number(Math.round(avgRating+'e1')+'e-1');
    return {
      _id: b._id,
      title: b.title,
      author: b.author,
      num_reviewers: totalReviewers,
      avg_rating: avgRating
    }
  });

  return (
    <div>
      Find out what others are sharing

      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Average Rating</th>
            <th>Number of readers</th>
          </tr>
        </thead>
        <tbody>
            {booksData.map((book) =>
              <tr key={book._id}>
                <td>
                  {book.title + ' by ' + book.author}
                </td>
                <td>
                  {book.avg_rating}
                </td>
                <td>
                  {book.num_reviewers}
                </td>
              </tr>
            )}
        </tbody>
      </table>

      <RaisedButton label="View More"
                    primary={true}
                    onTouchTap={() => history.push('/login')} />
    </div>
  )
}

export default OverviewSummary;
