import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../../context/auth/authContext';

const SignUp = (props) => {
  const AuthContext = useContext(authContext);
  const {
    loading,
    auth_error,
    auth_message,
    SignUp,
    clearErrors,
    clearMessages,
    isAuthenticated,
    isAuthUser,
  } = AuthContext;

  const initialUserValue = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  const [user, setUser] = useState(initialUserValue);
  const [isFormValid, setisFormValid] = useState(false);
  const { name, email, password, password2 } = user;

  useEffect(() => {
     // this function checks user authenticated or not by checking Local storage and cookies
     isAuthUser();
     // isAuthenticated is a global state to track user authentication and should to be called after the above function
     if (isAuthenticated) {
       props.history.push('/');
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

    if (auth_message) {
      toast.success(auth_message);
      clearMessages();
      setisFormValid(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_error, auth_message, isAuthenticated, props.history]);


  useEffect(() => {
    if (isFormValid) {
      setUser(initialUserValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormValid])

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() !== password2.trim()) {
      toast.error('Passwords do not match');
    }
    else {
      SignUp({
        name,
        email,
        password,
      });
    }
  };

  return (
   <>
      {!isAuthenticated && (

        <div className='col-md-6 offset-md-3'>
      <ToastContainer />
      <h1 className='p-5 text-center'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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

        <div className='form-group'>
          <label htmlFor='password2' className='text-muted'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password2'
            value={password2}
            onChange={handleChange}
          />
        </div>

            <div>
              {isFormValid ? (<input
                type='submit'
                className='btn  btn-primary'
                value="Signed Up"
                disabled
          />) : (<input
                type='submit'
                className='btn  btn-primary'
                value={loading === true ? 'Submitting..' : 'Submit'}
          />)  }


        </div>
      </form>
    </div>


        )}
   </>



  );
};

export default SignUp;
