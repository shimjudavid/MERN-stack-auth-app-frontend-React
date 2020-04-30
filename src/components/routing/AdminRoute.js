import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const AuthContext = useContext(authContext);
  const { isAuthenticated, user_info, loading } = AuthContext;

  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) =>
            isAuthenticated && user_info.role === 'admin' ? (
              <Component {...props} />
            ) : (
              <Redirect to='/signin' />
            )
          }
        />
      )}
    </>
  );
};

export default AdminRoute;
