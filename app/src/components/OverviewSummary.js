import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

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

  const paperStyles = {
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 15
  }

  return (
    <div className="overview-summary">
      <em>Find out what others are sharing</em>
      <Paper zDepth={2} style={paperStyles}>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn><h1>Books</h1></TableHeaderColumn>
              <TableHeaderColumn style={{width: 60, fontSize: 16}}>Rating</TableHeaderColumn>
              <TableHeaderColumn style={{width: 60, fontSize: 16}}>Readers</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={false} >
              {booksData.map( (book, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={{fontSize: 14}} className="book-cell"><b>{book.title}</b>{' by '}<em>{book.author}</em></TableRowColumn>
                  <TableRowColumn style={{width: 60, fontSize: 14}}>{book.avg_rating}</TableRowColumn>
                  <TableRowColumn style={{width: 60, fontSize: 14}}>{book.num_reviewers}</TableRowColumn>
                </TableRow>
                ))}
          </TableBody>
        </Table>
        <RaisedButton label="View More"
                      primary={true}
                      style={{marginLeft: 20, marginTop: 10}}
                      onTouchTap={() => history.push('/login')} />
      </Paper>
    </div>
  )
}

export default OverviewSummary;
