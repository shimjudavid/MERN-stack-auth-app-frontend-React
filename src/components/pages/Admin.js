import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../../context/auth/authContext';

const Admin = (props) => {
  const AuthContext = useContext(authContext);
  const {
    loading,
    isAuthenticated,
    user_info,
    isAuthUser,
    UpdateAdmin,
    auth_error,
    auth_message,
    clearMessages,
    clearErrors,
  } = AuthContext;
  const [formDisplay, setformDisplay] = useState(false);
  const [user, setUser] = useState({
    name: user_info.name,
    email: user_info.email,
    password: '',
  });
  const { name, email, password } = user;

  useEffect(() => {
    isAuthUser();
    // isAuthenticated is a global state to track user authentication and should to be called after the above function
    if (!isAuthenticated) {
      props.history.push('/signin');
    }

    if (auth_error) {
      setformDisplay(true);

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

    if (auth_message) {
      toast.success(auth_message);
      clearMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_error, auth_message, isAuthenticated, props.history]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateAdmin({
      name,
      password,
    });
  };

  return (
    <>
      <ToastContainer />
      {!formDisplay && (
        <div className='p-5 text-center'>
          <h2>Admin profile</h2>
          <h4>Name : {user_info.name}</h4>
          <h4>Email: {user_info.email}</h4>
          <button onClick={() => setformDisplay(true)}>Change Profile</button>
        </div>
      )}

      {formDisplay && (
        <form onSubmit={handleSubmit}>
          <h1 className='p-5 text-center'>Update Profile</h1>
          <div className='form-group'>
            <label htmlFor='name' className='text-muted'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='text-muted'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={email}
              disabled
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

          <div className='form-group'>
            <input
              type='submit'
              className='btn  btn-primary'
              value={loading === true ? 'Updating..' : 'Update'}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default Admin;
