import React, { useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = (props) => {
  let { token } = useParams();
  const [newpassword, setNewpassword] = useState('');

  const AuthContext = useContext(authContext);
  const {
    ResetPassword,
    isAuthenticated,
    isAuthUser,
    user_info,
    auth_error,
    auth_message,
    clearErrors,
    clearMessages
  } = AuthContext;

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

    if (auth_message) {
      toast.success(auth_message);
      clearMessages();
      setTimeout(() => {
        props.history.push('/signin');
      }, 3000);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_error, auth_message, isAuthenticated, props.history]);



  const handleSubmit = (e) => {
    e.preventDefault();
    ResetPassword({newpassword, token})
  }


  return (
    <div className='col-md-6 offset-md-3'>

      <ToastContainer />
        <h1 className='p-5 text-center'>Reset Your Password</h1>

        <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='newpassword' className='text-muted'>
            Enter your new password
          </label>
          <input
            type='password'
            className='form-control'
            name='newpassword'
            value={newpassword}
            onChange={(e)=>setNewpassword(e.target.value)}
          />
        </div>

        <div>
          <input
            type='submit'
            className='btn  btn-primary' value="Update Password"

          />
        </div>
      </form>




    </div>
  )
}

export default ResetPassword
