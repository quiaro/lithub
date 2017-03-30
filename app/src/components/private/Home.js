import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import PrivateAppBar from './AppBar'

const PrivateHome = (props) => (
  <div>
    <PrivateAppBar user={props.currentUser} />
    <div>What have others read lately?</div>
    <List>
      <ListItem><Link to={'/books'}>Books</Link></ListItem>
      <ListItem><Link to={'/articles'}>Articles</Link></ListItem>
      <ListItem><Link to={'/quotes'}>Quotes</Link></ListItem>
    </List>
    <div>
      <RaisedButton label="Share what you have read" primary={true} />
    </div>
  </div>
)

export default PrivateHome;
