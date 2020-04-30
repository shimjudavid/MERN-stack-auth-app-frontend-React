import React, { useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const ActivateAccount = (props) => {
  //store the token from the url to this variable
  let { activatetoken } = useParams();
  const AuthContext = useContext(authContext);
  const {
    auth_error,
    auth_message,
    ActivateAccount,
    clearErrors,
    clearMessages,
  } = AuthContext;

  useEffect(() => {
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
  }, [auth_error, auth_message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activatetoken.trim()) {
      toast.error('Valid Token is required to activate the account');
    } else {
      ActivateAccount({
        token: activatetoken,
      });
    }
  };

  return (
    <div className='col-md-6 offset-md-3 text-center'>
      <ToastContainer />
      <h2 className='p-5 '>
        Please click the activate button to activate your account
      </h2>
      <button className='btn btn-outline-primary' onClick={handleSubmit}>
        Activate Your Account
      </button>
    </div>
  );
};

export default ActivateAccount;
