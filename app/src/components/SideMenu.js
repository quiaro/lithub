import React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const SelectableList = makeSelectable(List);

const SideMenu = (props) => (
  <Drawer docked={false}
          width={300}
          open={props.isOpen}
          onRequestChange={props.onUpdate}>
    <Subheader>My History</Subheader>
    <SelectableList value={props.location.pathname} onChange={props.onMenuChange}>
      <ListItem primaryText="All items" value="/history" />
      <ListItem primaryText="Books" value="/history/books" />
      <ListItem primaryText="Articles" value="/history/articles" />
      <ListItem primaryText="Quotes" value="/history/quotes" />
    </SelectableList>
    <Divider />
    <RaisedButton label="Add new read item" primary={true} />
  </Drawer>
)
export default SideMenu;
