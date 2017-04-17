import React from 'react';
import { Switch } from 'react-router-dom';

import AppBar from './AppBar'
import SideMenu from './SideMenu'
import Dashboard from './Dashboard';
import AddItem from './AddItem';
import PrivateRoute from './PrivateRoute';

// Book Components
import BooksReadByOthers from '../containers/BooksByOthers';
import BookView from '../containers/BookView';
import BookHistory from '../containers/history/Books';
import BookViewHistory from '../containers/history/BookView';
import BookEditHistory from '../containers/history/BookEdit';

// Article Components
import ArticlesReadByOthers from '../containers/ArticlesByOthers';
import ArticleView from '../containers/ArticleView';
import ArticleHistory from '../containers/history/Articles';
import ArticleViewHistory from '../containers/history/ArticleView';
import ArticleEditHistory from '../containers/history/ArticleEdit';

// Article Components
import QuotesReadByOthers from '../containers/QuotesByOthers';
import QuoteView from '../containers/QuoteView';
import QuoteHistory from '../containers/history/Quotes';
import QuoteViewHistory from '../containers/history/QuoteView';
import QuoteEditHistory from '../containers/history/QuoteEdit';

const App = (props) => {
  const { isAuthenticated,
          currentUser,
          history,
          location,
          isSideMenuOpen,
          menuClose,
          menuUpdate,
          menuToggle,
          onMenuChange,
          redirect } = props;
  return (
    <div>
      <SideMenu location={location}
                isOpen={isSideMenuOpen}
                onClose={menuClose}
                onUpdate={menuUpdate}
                onMenuChange={onMenuChange}
                onBtnClick={redirect} />
      <AppBar user={currentUser} onIconClick={menuToggle} history={history} />
      {/* If a user navigates to a specific URL, the App component will pass on the prop
          'isAuthenticated' to the matching private route. The private route component
          will determine whether to show the corresponding component or redirect the user
          to login */}
      <Switch>
        <PrivateRoute path='/home'
                      component={Dashboard}
                      isAuthenticated={isAuthenticated}
                      location={location}
                      onMenuChange={onMenuChange}
                      onBtnClick={redirect} />
        <PrivateRoute path='/add' component={AddItem} isAuthenticated={isAuthenticated}/>

        {/* Routes for books */}
        <PrivateRoute path='/books/:id' component={BookView} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/books' component={BooksReadByOthers} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/books/:id/edit' component={BookEditHistory} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/books/:id' component={BookViewHistory} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/books' component={BookHistory} isAuthenticated={isAuthenticated}/>

        {/* Routes for articles */}
        <PrivateRoute path='/articles/:id' component={ArticleView} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/articles' component={ArticlesReadByOthers} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/articles/:id/edit' component={ArticleEditHistory} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/articles/:id' component={ArticleViewHistory} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/articles' component={ArticleHistory} isAuthenticated={isAuthenticated}/>

        {/* Routes for quotes */}
        <PrivateRoute path='/quotes/:id' component={QuoteView} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/quotes' component={QuotesReadByOthers} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/quotes/:id/edit' component={QuoteEditHistory} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/quotes/:id' component={QuoteViewHistory} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/history/quotes' component={QuoteHistory} isAuthenticated={isAuthenticated}/>
      </Switch>
    </div>
  )
}

export default App;
