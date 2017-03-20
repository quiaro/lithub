import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Base from './components/Base';
import Home from './components/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router>
      <Base>
        <Route exact path="/" component={Home} />
      	<Route path="/login" component={Login} />
      	<Route path="/signup" component={SignUp} />
      </Base>
    </Router>
  </MuiThemeProvider>), document.getElementById('root'));
