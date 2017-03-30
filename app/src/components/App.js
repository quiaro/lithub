import React from 'react';
import AppBar from './AppBar'
import SideMenu from './SideMenu'
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

const App = (props) => {
  const { isAuthenticated,
          currentUser,
          isSideMenuOpen,
          menuClose,
          menuUpdate,
          menuToggle } = props;
  return (
    <div>
      <SideMenu isOpen={isSideMenuOpen}
                onClose={menuClose}
                onUpdate={menuUpdate} />
      <AppBar user={currentUser} onIconClick={menuToggle} />
      <PrivateRoute path='/home' component={Dashboard} isAuthenticated={isAuthenticated} />
    </div>
  )
}

export default App;
