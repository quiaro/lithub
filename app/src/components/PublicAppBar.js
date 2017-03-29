import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { withRouter } from 'react-router-dom'

const PublicAppBar = withRouter(({ history }) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text="Lit Hub" />
    </ToolbarGroup>
    <ToolbarGroup lastChild={true}>
      <FlatButton label="Login"
                  primary={true}
                  onTouchTap={() => history.push('/login')} />
      <FlatButton label="Sign Up"
                  primary={true}
                  onTouchTap={() => history.push('/signup')} />
    </ToolbarGroup>
  </Toolbar>
))

export default PublicAppBar;
