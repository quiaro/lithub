import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import { Link } from 'react-router-dom';

const BooksByOthers = ({ books, history }) => {

  const tableData = books.map(b => {
    const totalRating = b.reviews.reduce((acc, obj) => acc + obj.rating, 0);
    const totalReviewers = b.reviews.length;
    let avgRating = totalRating / totalReviewers;

    // Round to 1 decimal per:
    // http://www.jacklmoore.com/notes/rounding-in-javascript/
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    avgRating = Number(Math.round(avgRating+'e1')+'e-1');
    return {
      _id: b._id,
      title: b.title,
      author: b.author,
      url_title: encodeURIComponent(b.title),
      url_author: encodeURIComponent(b.author),
      num_reviewers: totalReviewers,
      avg_rating: avgRating,
      last_modified: b.last_modified
    }
  });

  return (
    <div>
      <h1>Books Read by Others</h1>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn tooltip="Book Title">Title</TableHeaderColumn>
            <TableHeaderColumn tooltip="Book Author">Author</TableHeaderColumn>
            <TableHeaderColumn tooltip="Total number of users who have read the book">Readers</TableHeaderColumn>
            <TableHeaderColumn tooltip="Average rating for the book">Rating</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover={true}
          stripedRows={true} >
            {tableData.map( (book, index) => (
              <TableRow key={index}>
                <TableRowColumn><Link to={`/books/${book._id}`}>{book.title}</Link></TableRowColumn>
                <TableRowColumn>{book.author}</TableRowColumn>
                <TableRowColumn>{book.num_reviewers}</TableRowColumn>
                <TableRowColumn>{book.avg_rating}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="I read it"
                                primary={true}
                                onTouchTap={() => history.push(`/add/book?title=${book.url_title}&author=${book.url_author}`)} />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    </div>
  )
}

export default BooksByOthers;
