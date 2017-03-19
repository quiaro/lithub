import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import App from './components/App/App';
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router>
      <Base>
        <Route exact path="/" component={HomePage} />
      	<Route path="/login" component={LoginPage} />
      	<Route path="/signup" component={SignUpPage} />
      </Base>
    </Router>
  </MuiThemeProvider>), document.getElementById('root'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App/App';
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
