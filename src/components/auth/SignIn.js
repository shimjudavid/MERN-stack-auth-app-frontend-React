import React, { useState, useContext, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../../context/auth/authContext';

const SignIn = (props) => {
  const AuthContext = useContext(authContext);
  const {
    user_info,
    loading,
    isAuthenticated,
    auth_error,
    auth_message,
    clearErrors,
    clearMessages,
    SignIn,
    isAuthUser,
  } = AuthContext;

  const initialUserValue = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialUserValue);
  const { email, password } = user;

  useEffect(() => {
    // this function checks user authenticated or not by checking Local storage and cookies
    isAuthUser();
    // isAuthenticated is a global state to track user authentication and should to be called after the above function
    if (isAuthenticated && user_info.role === 'admin') {
      props.history.push('/admin');
    }
    if (isAuthenticated && user_info.role === 'subscriber') {
      props.history.push('/private');
    }

    if (auth_error) {
      // Auth_error can be string OR an array of error objects

      // IF Auth_error is an array or error objects, do this
      if (Array.isArray(auth_error)) {
        auth_error.forEach((err) => {
          let msg = Object.values(err).toString();
          toast.error(msg);
        });
      } else {
        // if Auth error is just string, do this
        toast.error(auth_error);
      }

      // finally clear all the errors from global state
      clearErrors();
    }

    if (auth_message && user_info) {
      toast.success(`${user_info.name} ${auth_message}`);
      clearMessages();

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_error, auth_message, isAuthenticated, props.history]);



  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    SignIn({
      email,
      password,
    });
  };

  return (
    <>
      {!isAuthenticated && (

    <div className='col-md-6 offset-md-3'>
      <ToastContainer />
      <h1 className='p-5 text-center'>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email' className='text-muted'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='text-muted'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type='submit'
            className='btn  btn-primary'
            value={loading === true ? 'Submitting..' : 'Submit'}
          />
            </div>
            <div>
            <Link to='/forgot-password' className='nav-link'>
            Forgot your password?
            </Link>


           </div>
      </form>
      </div>
      )}

      </>
  );
};

export default SignIn;
