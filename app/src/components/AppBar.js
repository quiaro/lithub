import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const toolbarTitleStyles = {
  fontFamily: '"Great Vibes", cursive',
  fontSize: '2.2em',
  color: 'white',
  textDecoration: 'none'
}

const toolbarButton = {
  color: 'white'
}

const username = {
  color: '#f7f1e0',
  fontSize: '1em'
}

const AppBar = (props) => (
  <Toolbar className="app-bar">
    <ToolbarGroup>
      <IconButton touch={true} onTouchTap={props.onIconClick} iconStyle={toolbarButton}>
        <NavigationMenuIcon />
      </IconButton>
      <Link to="/home" style={toolbarTitleStyles}>Lit Hub</Link>
    </ToolbarGroup>
    { props.user ?
      <ToolbarGroup lastChild={true}>
        <ToolbarTitle text={props.user.username} style={username} />
        { props.user.picture && <Avatar src={props.user.picture} /> }
        { !props.user.picture &&
          <Avatar>{props.user.username.charAt(0).toUpperCase()}</Avatar> }

        <FlatButton label="Logout"
                    onTouchTap={() => props.history.push('/logout') }
                    primary={true}
                    style={toolbarButton} />

      </ToolbarGroup>
      : <div></div>
    }
  </Toolbar>
)

export default AppBar;
