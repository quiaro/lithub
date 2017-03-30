import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const SideMenu = (props) => (
  <Drawer docked={false}
          width={300}
          open={props.isOpen}
          onRequestChange={props.onUpdate}>
    <Subheader>My History</Subheader>
    <MenuItem onTouchTap={props.onClose}>
      <Link to={'/history'}>All items</Link>
    </MenuItem>
    <MenuItem onTouchTap={props.onClose}>
      <Link to={'/history/books'}>Books</Link>
    </MenuItem>
    <MenuItem onTouchTap={props.onClose}>
      <Link to={'/history/articles'}>Articles</Link>
    </MenuItem>
    <MenuItem onTouchTap={props.onClose}>
      <Link to={'/history/quotes'}>Quotes</Link>
    </MenuItem>
    <Divider />
    <RaisedButton label="Add new read item" primary={true} />
  </Drawer>
)
export default SideMenu;
