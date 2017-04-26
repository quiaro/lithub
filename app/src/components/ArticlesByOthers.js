import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import unescape from 'validator/lib/unescape';

const ArticlesByOthers = ({ articles, history, addExisting }) => {

  const tableData = articles.map(a => {
    const totalRating = a.reviews.reduce((acc, obj) => acc + obj.rating, 0);
    const totalReviewers = a.reviews.length;
    let avgRating = totalRating / totalReviewers;

    // Round to 1 decimal per:
    // http://www.jacklmoore.com/notes/rounding-in-javascript/
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    avgRating = Number(Math.round(avgRating+'e1')+'e-1');
    return {
      _id: a._id,
      title: a.title,
      author: a.author,
      link: a.link,
      num_reviewers: totalReviewers,
      avg_rating: avgRating,
      last_modified: a.last_modified
    }
  });

  return (
    <Paper className="resource-listing others-articles">
      <h1>Articles Read by Others</h1>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn className="col-title" tooltip="Article Title">Title</TableHeaderColumn>
            <TableHeaderColumn className="col-author" tooltip="Article Author">Author</TableHeaderColumn>
            <TableHeaderColumn className="col-readers" tooltip="Total number of users who have read the article">Readers</TableHeaderColumn>
            <TableHeaderColumn className="col-rating" tooltip="Average rating for the article">Rating</TableHeaderColumn>
            <TableHeaderColumn className="col-action"></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover={true}
          stripedRows={false} >
            {tableData.map( (article, index) => (
              <TableRow key={index}>
                <TableRowColumn className="col-title"><Link to={`/articles/${article._id}`}>{unescape(article.title)}</Link></TableRowColumn>
                <TableRowColumn className="col-author">{article.author}</TableRowColumn>
                <TableRowColumn className="col-readers">{article.num_reviewers}</TableRowColumn>
                <TableRowColumn className="col-rating">{article.avg_rating}</TableRowColumn>
                <TableRowColumn className="col-action">
                  <FlatButton label="I read it"
                                primary={true}
                                onTouchTap={() => addExisting(article)} />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    </Paper>
  )
}

export default ArticlesByOthers;
