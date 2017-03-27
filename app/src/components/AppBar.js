import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

export default class AppBar extends React.Component {

  render() {
    let menuOptions, avatar;
    if (this.props.user) {
      avatar = (this.props.user.picture) ?
                <Avatar src="{this.props.user.picture}" /> :
                <Avatar>{this.props.user.username.charAt(0).toUpperCase()}</Avatar>;
    }

    if (!this.props.authenticated) {
      menuOptions =  (<ToolbarGroup lastChild={true}>
                        <FlatButton label="Login" primary={true} />
                        <FlatButton label="Sign Up" primary={true} />
                      </ToolbarGroup>);
    } else {
      menuOptions = (<ToolbarGroup lastChild={true}>
                        <ToolbarTitle text="David" />
                        { avatar }
                      </ToolbarGroup>)
    }

    return (
      <Toolbar>
        <ToolbarGroup>
          {this.props.authenticated &&
            <IconButton touch={true}>
              <NavigationMenuIcon />
            </IconButton>
          }
          <ToolbarTitle text="Lit Hub" />
        </ToolbarGroup>
        { menuOptions }
      </Toolbar>
    );
  }
}
