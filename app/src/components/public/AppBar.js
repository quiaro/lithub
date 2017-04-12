import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const toolbarStyles = {
  height: 66
}

const toolbarTitleStyles = {
  fontFamily: '"Great Vibes", cursive',
  fontSize: '2.2em',
  color: 'white'
}

const toolbarButton = {
  color: 'white',
  margin: 0
}

const PublicAppBar = ({ history }) => (
  <Toolbar className="nav" style={toolbarStyles}>
    <ToolbarGroup>
      <ToolbarTitle text="Lit Hub" style={toolbarTitleStyles} />
    </ToolbarGroup>
    <ToolbarGroup style={{ marginRight: 10 }} lastChild={true}>
      <FlatButton label="Login"
                  primary={true}
                  style={toolbarButton}
                  onTouchTap={() => history.push('/login')} />
      <FlatButton label="Sign Up"
                  primary={true}
                  style={toolbarButton}
                  onTouchTap={() => history.push('/signup')} />
    </ToolbarGroup>
  </Toolbar>
)

export default PublicAppBar;
