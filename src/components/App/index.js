import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as KEYS from '../../constants/strings';
import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import Edit from '../Edit/Edit';
import Resources from '../Resources/Resources';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem(KEYS.STORAGE_KEY)
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
)

const App = () => (
  <Router>
    <div className="body">
      <PrivateRoute exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.SIGNIN} component={SignIn} />
      <PrivateRoute path={ROUTES.EDIT} component={Edit} />
      <PrivateRoute path={ROUTES.RESOURCES} component={Resources} />
    </div>
  </Router>
);

export default App;
