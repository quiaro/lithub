import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

const Dashboard = ({ books, history, onBtnClick }) => {

  const tableData = books.map(b => {
    const totalRating = b.reviews.reduce((acc, obj) => acc + obj.rating, 0);
    const totalReviewers = b.reviews.length;
    let avgRating = totalRating / totalReviewers;

    // Round to 1 decimal per:
    // http://www.jacklmoore.com/notes/rounding-in-javascript/
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    avgRating = Number(Math.round(avgRating+'e1')+'e-1');
    return {
      title: b.title,
      author: b.author,
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
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.title}</TableRowColumn>
                <TableRowColumn>{row.author}</TableRowColumn>
                <TableRowColumn>{row.num_reviewers}</TableRowColumn>
                <TableRowColumn>{row.avg_rating}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="I read it"
                                primary={true}
                                onTouchTap={() => onBtnClick('/add/book')} />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    </div>
  )
}

export default Dashboard;
