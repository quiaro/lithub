import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

const BooksByOthers = ({ books, history, addExisting }) => {

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
      num_reviewers: totalReviewers,
      avg_rating: avgRating,
      last_modified: b.last_modified
    }
  });

  return (
    <Paper className="resource-listing others-books">
      <h1>Books Read by Others</h1>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn className="col-title" tooltip="Book Title">Title</TableHeaderColumn>
            <TableHeaderColumn className="col-author" tooltip="Book Author">Author</TableHeaderColumn>
            <TableHeaderColumn className="col-readers" tooltip="Total number of users who have read the book">Readers</TableHeaderColumn>
            <TableHeaderColumn className="col-rating" tooltip="Average rating for the book">Rating</TableHeaderColumn>
            <TableHeaderColumn className="col-action"></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover={true}
          stripedRows={false} >
            {tableData.map( (book, index) => (
              <TableRow key={index}>
                <TableRowColumn className="col-title"><Link to={`/books/${book._id}`}>{book.title}</Link></TableRowColumn>
                <TableRowColumn className="col-author">{book.author}</TableRowColumn>
                <TableRowColumn className="col-readers">{book.num_reviewers}</TableRowColumn>
                <TableRowColumn className="col-rating">{book.avg_rating}</TableRowColumn>
                <TableRowColumn className="col-action">
                  <FlatButton label="I read it"
                                primary={true}
                                onTouchTap={() => addExisting(book)} />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    </Paper>
  )
}

export default BooksByOthers;
