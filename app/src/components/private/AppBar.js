import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';

const PrivateAppBar = (props) => (
  <Toolbar>
    <ToolbarGroup>
      <IconButton touch={true} onTouchTap={props.menuToggle}>
        <NavigationMenuIcon />
      </IconButton>
      <ToolbarTitle text="Lit Hub" />
    </ToolbarGroup>
    { props.user ?
      <ToolbarGroup lastChild={true}>
        <ToolbarTitle text={props.user.username} />
        { props.user.picture && <Avatar src="{props.user.picture}" /> }
        { !props.user.picture &&
          <Avatar>{props.user.username.charAt(0).toUpperCase()}</Avatar> }
        <Link to={'/logout'}>Log out</Link>
      </ToolbarGroup>
      : <div></div>
    }
  </Toolbar>
)

export default PrivateAppBar;
