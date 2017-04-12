import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import appTheme from './styles/theme';
import * as Store from './app/store';
import Home from './containers/Home';
import App from './containers/App';
import Logout from './containers/Logout';
import Login from './containers/forms/Login';
import SignUp from './containers/forms/SignUp';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
  <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
    <Provider store={Store.configure()}>
      <Router>
        <Switch>
          {/* All public routes are declared here. Any routes that don't match
              will be handled by the App component, which checks first if the
              user is authenticated or not. If not, it will prompt the user to
              login. */}
          <Route exact path="/" component={Home} />
        	<Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        	<Route path="/signup" component={SignUp} />
          <Route component={App} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>), document.getElementById('root'));
