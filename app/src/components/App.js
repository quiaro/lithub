import React from 'react';
import AppBar from './AppBar'
import SideMenu from './SideMenu'
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import BooksHistory from '../containers/history/Books';
import ArticlesHistory from '../containers/history/Articles';
import QuotesHistory from '../containers/history/Quotes';

const App = (props) => {
  const { isAuthenticated,
          currentUser,
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
      <AppBar user={currentUser} onIconClick={menuToggle} />
      {/* If a user navigates to a specific URL, the App component will pass on the prop
          'isAuthenticated' to the matching private route. The private route component
          will determine whether to show the corresponding component or redirect the user
          to login */}
      <PrivateRoute path='/home' component={Dashboard} isAuthenticated={isAuthenticated} />
      <PrivateRoute path='/history/books' component={BooksHistory} isAuthenticated={isAuthenticated} />
      <PrivateRoute path='/history/articles' component={ArticlesHistory} isAuthenticated={isAuthenticated} />
      <PrivateRoute path='/history/quotes' component={QuotesHistory} isAuthenticated={isAuthenticated} />
    </div>
  )
}

export default App;
