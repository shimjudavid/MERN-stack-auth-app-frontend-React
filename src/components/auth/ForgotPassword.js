import React, { useState, useContext, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../../context/auth/authContext';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [resetmailsent, setResetmailsent] = useState(false);

  const AuthContext = useContext(authContext);
  const {
    ForgotPassword,
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
      setResetmailsent(true);
      clearMessages();

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_error, auth_message, isAuthenticated, props.history]);



  const handleSubmit = (e) => {
    e.preventDefault();
    ForgotPassword({ email });
  }
  return (
    <div className='col-md-6 offset-md-3'>
      <ToastContainer />
      {!resetmailsent ? (
        <>
        <h1 className='p-5 text-center'>Forgot Password</h1>
        <h3>Enter your email address below and we’ll send you password reset link.</h3>
        </>
      ) :
        (
          <>
            <h1 className='p-5 text-center'>Reset Mail Sent</h1>
            <h3>Reset Password link is sent to your registered email.</h3>
          </>


        )}

      {!resetmailsent && (

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
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type='submit'
            className='btn  btn-primary' value="Email me reset link"

          />
        </div>
      </form>

      )}


    </div>
  )
}

export default ForgotPassword
