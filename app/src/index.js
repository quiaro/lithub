import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as Store from './app/store'
import Home from './containers/Home';
import Login from './containers/forms/Login';
import SignUp from './containers/forms/SignUp';
// import PrivateRoute from './containers/PrivateRoute';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={Store.configure()}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
        	<Route path="/login" component={Login} />
        	<Route path="/signup" component={SignUp} />
          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>), document.getElementById('root'));
