import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import unescape from 'validator/lib/unescape';

const OverviewSummary = ({ books, articles, quotes, history }) => {

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

  const articlesData = articles.map(a => {
    const totalRating = a.reviews.reduce((acc, obj) => acc + obj.rating, 0);
    const totalReviewers = a.reviews.length;
    let avgRating = totalRating / totalReviewers;

    avgRating = Number(Math.round(avgRating+'e1')+'e-1');
    return {
      _id: a._id,
      title: a.title,
      author: a.author,
      num_reviewers: totalReviewers,
      avg_rating: avgRating
    }
  });

  const quotesData = quotes.map(q => {
    return {
      _id: q._id,
      quote: q.quote,
      author: q.author,
      num_favorites: q.reviews.length
    }
  });

  const paperStyles = {
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 15
  }

  const quoteStyle = {
    fontSize: 14,
    overflow: 'visible',
    whiteSpace: 'wrap',
    paddingTop: 10,
    paddingBottom: 10
  }

  return (
    <div className="overview-summary">
      <em>Find out what others are sharing</em>

      {/* Books */}
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

      {/* Articles */}
      <Paper zDepth={2} style={paperStyles}>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn><h1>Articles</h1></TableHeaderColumn>
              <TableHeaderColumn style={{width: 60, fontSize: 16}}>Rating</TableHeaderColumn>
              <TableHeaderColumn style={{width: 60, fontSize: 16}}>Readers</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={false} >
              {articlesData.map( (article, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={{fontSize: 14}} className="article-cell"><b>{unescape(article.title)}</b>{' by '}<em>{article.author}</em></TableRowColumn>
                  <TableRowColumn style={{width: 60, fontSize: 14}}>{article.avg_rating}</TableRowColumn>
                  <TableRowColumn style={{width: 60, fontSize: 14}}>{article.num_reviewers}</TableRowColumn>
                </TableRow>
                ))}
          </TableBody>
        </Table>
        <RaisedButton label="View More"
                      primary={true}
                      style={{marginLeft: 20, marginTop: 10}}
                      onTouchTap={() => history.push('/login')} />
      </Paper>

      {/* Quotes */}
      <Paper zDepth={2} style={paperStyles}>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn><h1>Quotes</h1></TableHeaderColumn>
              <TableHeaderColumn style={{width: 90, fontSize: 16}}>Favorited by</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={false} >
              {quotesData.map( (quote, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={quoteStyle} className="quote-cell"><blockquote>{unescape(quote.quote)}</blockquote>{quote.author && <em>{quote.author}</em>}</TableRowColumn>
                  <TableRowColumn style={{width: 90, fontSize: 14}}>{quote.num_favorites}</TableRowColumn>
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
