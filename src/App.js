import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Home from './components/pages/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ActivateAccount from './components/auth/ActivateAccount';
import Private from './components/pages/Private';
import Admin from './components/pages/Admin';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import NotFound from './components/pages/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

import AuthState from './context/auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/signin' component={SignIn} />
            <Route path='/auth/activate/:activatetoken' component={ActivateAccount}/>
            <PrivateRoute exact path='/private' component={Private} />
            <AdminRoute exact path='/admin' component={Admin} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/reset-password/:token' component={ResetPassword} />
            <Route component={NotFound}/>
          </Switch>
        </Layout>
      </Router>
    </AuthState>
  );
};

export default App;
