import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import unescape from 'validator/lib/unescape';

const QuotesByOthers = ({ quotes, history }) => {

  const tableData = quotes.map(q => {
    return {
      _id: q._id,
      quote: q.quote,
      author: q.author,
      num_favorites: q.reviews.length,
      last_modified: q.last_modified
    }
  });

  const quoteStyle = {
    overflow: 'visible',
    whiteSpace: 'wrap',
    paddingTop: 10,
    paddingBottom: 10
  }

  return (
    <Paper className="resource-listing others-quotes">
      <h1>Quotes Favorited by Others</h1>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn className="col-quote">Quote</TableHeaderColumn>
            <TableHeaderColumn className="col-author" tooltip="Quote Author">Author</TableHeaderColumn>
            <TableHeaderColumn className="col-readers" tooltip="Number of readers who have favorited the quote">Favorited by</TableHeaderColumn>
            <TableHeaderColumn className="col-action"></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover={true}
          stripedRows={false} >
            {tableData.map( (quote, index) => (
              <TableRow key={index}>
                <TableRowColumn className="col-quote" style={quoteStyle}><Link to={`/quotes/${quote._id}`}>{unescape(quote.quote)}</Link></TableRowColumn>
                <TableRowColumn className="col-author">{quote.author ? quote.author : 'anonymous/unknown'}</TableRowColumn>
                <TableRowColumn className="col-readers">{quote.num_favorites}</TableRowColumn>
                <TableRowColumn className="col-action">
                  <FlatButton label="Add to Favorites"
                              primary={true}
                              onTouchTap={() => history.push(`/add/quote`)} />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    </Paper>
  )
}

export default QuotesByOthers;
