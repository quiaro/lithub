import React from 'react';
import AppBar from './AppBar'
import SideMenu from './SideMenu'
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

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
      <PrivateRoute path='/home' component={Dashboard} isAuthenticated={isAuthenticated} />
    </div>
  )
}

export default App;
