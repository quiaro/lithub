import React from 'react';
import { Switch } from 'react-router-dom';

import AppBar from './AppBar'
import SideMenu from './SideMenu'
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import BooksHistory from '../containers/history/Books';
import ArticlesHistory from '../containers/history/Articles';
import QuotesHistory from '../containers/history/Quotes';
import AddItem from '../components/add/Item';

const App = (props) => {
  const { isAuthenticated,
          currentUser,
          logout,
          history,
          location,
          isSideMenuOpen,
          menuClose,
          menuUpdate,
          menuToggle,
          onMenuChange } = props;
  return (
    <div>
      <SideMenu location={location}
                isOpen={isSideMenuOpen}
                onClose={menuClose}
                onUpdate={menuUpdate}
                onMenuChange={onMenuChange} />
      <AppBar user={currentUser} onIconClick={menuToggle} onLogout={logout} />
      {/* If a user navigates to a specific URL, the App component will pass on the prop
          'isAuthenticated' to the matching private route. The private route component
          will determine whether to show the corresponding component or redirect the user
          to login */}
      <Switch>
        <PrivateRoute path='/home' component={Dashboard} isAuthenticated={isAuthenticated} />
        <PrivateRoute path='/add' component={AddItem} isAuthenticated={isAuthenticated} history={history} />
        <PrivateRoute path='/history/books' component={BooksHistory} isAuthenticated={isAuthenticated} />
        <PrivateRoute path='/history/articles' component={ArticlesHistory} isAuthenticated={isAuthenticated} />
        <PrivateRoute path='/history/quotes' component={QuotesHistory} isAuthenticated={isAuthenticated} />
      </Switch>
    </div>
  )
}

export default App;
