import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

const PrivateAppBar = (props) => (
  <Toolbar>
    <ToolbarGroup>
      <IconButton touch={true}>
        <NavigationMenuIcon />
      </IconButton>
      <ToolbarTitle text="Lit Hub" />
    </ToolbarGroup>
    <ToolbarGroup lastChild={true}>
      <ToolbarTitle text="{props.user.username}" />
      { props.user.picture && <Avatar src="{props.user.picture}" /> }
      { !props.user.picture &&
        <Avatar>{props.user.username.charAt(0).toUpperCase()}</Avatar> }
      <FlatButton label="Log out" primary={true} />
    </ToolbarGroup>
  </Toolbar>
)

export default PrivateAppBar;
