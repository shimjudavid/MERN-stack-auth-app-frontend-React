import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const Layout = ({ children }) => {
  const AuthContext = useContext(authContext);
  const { user_info, isAuthenticated, isAuthUser, SignOut } = AuthContext;
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    // this function checks user authenticated or not by checking Local storage and cookies
    isAuthUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: '#000' };
    } else {
      return { color: '#fff' };
    }
  };

  const nav = () => (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <Link to='/' className='nav-link' style={isActive('/')}>
          Home
        </Link>
      </li>
      {!isAuthenticated && (
        <>
          <li className='nav-item'>
            <Link to='/signup' className='nav-link' style={isActive('/signup')}>
              Sign Up
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/signin' className='nav-link' style={isActive('/signin')}>
              Sign In
            </Link>
          </li>
        </>
      )}

      {isAuthenticated && (
        <>
          {user_info && user_info.role === 'admin' && (
            <li className='nav-item'>
              <Link className='nav-link' style={isActive('/admin')} to='/admin'>
                {user_info.name}'s Dashboard
              </Link>
            </li>
          )}

          {user_info && user_info.role === 'subscriber' && (
            <li className='nav-item'>
              <Link className='nav-link' style={isActive('/private')} to='/private'>
                {user_info.name}'s Dashboard
              </Link>
            </li>
          )}

          <li className='nav-item'>
            <span
              className='nav-link'
              style={{ cursor: 'pointer', color: '#fff' }}
              onClick={() => {
                SignOut();
                history.push('/');
              }}
            >
              Sign Out
            </span>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <>

      {nav()}
      <div className='container'>{children}</div>
    </>
  );
};

export default Layout;
