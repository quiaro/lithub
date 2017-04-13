import React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const SelectableList = makeSelectable(List);

const buttonStyle = {
  marginTop: 5,
  marginLeft: 15
}

const SideMenu = ({
    isOpen,
    onUpdate,
    location,
    onMenuChange,
    onBtnClick
  }) => (
    <Drawer docked={false}
            width={300}
            open={isOpen}
            className="side-menu"
            onRequestChange={onUpdate}>
      <h3>My History</h3>
      <SelectableList value={location.pathname} onChange={onMenuChange}>
        <ListItem primaryText="Books" value="/history/books" hoverColor='#ceb29e' />
        <ListItem primaryText="Articles" value="/history/articles" hoverColor='#ceb29e' />
        <ListItem primaryText="Quotes" value="/history/quotes" hoverColor='#ceb29e' />
      </SelectableList>
      <RaisedButton label="Add new item"
                    style={buttonStyle}
                    onTouchTap={() => onBtnClick('/add')} primary={true} />
    </Drawer>
  )
export default SideMenu;
