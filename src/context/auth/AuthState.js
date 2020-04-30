import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SET_LOADING,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  ACCOUNT_ACTIVATION_SUCCESS,
  ACCOUNT_ACTIVATION_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  SIGN_OUT,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FORGOT_PASSWORD_MAIL_SUCCESS,
  FORGOT_PASSWORD_MAIL_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../types';

// import Auth Helpers, these are the methods which we use to
// set and remove token in local storage and set & remove user object in a cookie
import {
  setCookie,
  removeCookie,
  getCookie,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../../components/auth/Auth_Helpers';

const AuthState = (props) => {
  const initialState = {
    user_info: null,
    isAuthenticated: null,
    loading: true,
    auth_error: null,
    auth_message: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const SignUp = async (formData) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/signup`,
        formData,
        config
      );
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data.message,
      });
    } catch (error) {
      // some times response will be a single string of error
      if (error.response.data.error) {
        dispatch({
          type: SIGNUP_FAIL,
          payload: error.response.data.error,
        });
      }
      // some times response will be an array of error objects
      if (error.response.data.errors) {
        dispatch({
          type: SIGNUP_FAIL,
          payload: error.response.data.errors,
        });
      }
    }
  };

  // ACCOUNT ACTIVATION
  const ActivateAccount = async (formData) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/account-activation`,
        formData,
        config
      );
      dispatch({
        type: ACCOUNT_ACTIVATION_SUCCESS,
        payload: res.data.message,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_ACTIVATION_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  // SIGN IN
  const SignIn = async (formData) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/signin`,
        formData,
        config
      );

      /*
      Once the login is successful, we need to -
     1)  store the token  returned as axios response in a Cookie
     2) store the user object returned as axios response in a LocalStorage
      */
      setCookie('token', response.data.token);
      setLocalStorage('user', response.data.user);

      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: response.data.user,
      });
    } catch (error) {
      // some times response will be a single string of error
      if (error.response.data.error) {
        dispatch({
          type: SIGN_IN_FAIL,
          payload: error.response.data.error,
        });
      }
      // some times response will be an array of error objects
      if (error.response.data.errors) {
        dispatch({
          type: SIGN_IN_FAIL,
          payload: error.response.data.errors,
        });
      }
    }
  };

  // IsAuthUser() - this function is to check user is authenticated user or not
  // access user info from LocalStorage and token from cookie
  const isAuthUser = () => {
    setLoading();
    if (window !== 'undefined') {
      const cookieChecked = getCookie('token');
      const auth_user = getLocalStorage('user');
      if (cookieChecked && auth_user) {
        dispatch({
          type: USER_AUTH_SUCCESS,
          payload: JSON.parse(auth_user),
        });
      } else {
        dispatch({
          type: USER_AUTH_FAIL,
        });
      }
    }
  };

  // SIGN OUT
  // Remove the token from the cookie and remove the userinfo from local storage
  const SignOut = () => {
    setLoading();
    if (window !== 'undefined') {
      if (getCookie('token')) {
        removeCookie('token');
      }
      if (getLocalStorage('user')) {
        removeLocalStorage('user');
      }
      dispatch({
        type: SIGN_OUT,
      });
    }
  };

  // UPDATE USER PROFILE
// update the user's profile - name and password

  const UpdateUser = async (formData) => {
    setLoading();
    // As this is a private API route, we need to pass
    // JWT Token as Bearer token via Axios Header while calling the end point

    // So first check the existance of token from cookie
    // if not exists, then signout
    // if exists, then  grab the token from our cookie


    if (window !== 'undefined') {
      if (getCookie('token')) {
        const token = getCookie("token");
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        };
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API}/user`,
            formData,
            config
          );

          /*
          Once the UPDATE is successful, we need to -
          store the updated user object returned as axios response in our LocalStorage's user object
          */
          setLocalStorage('user', response.data.user);

          dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: response.data.user,
          });
        } catch (error) {
          // some times response will be a single string of error
          if (error.response.data.error) {
            dispatch({
              type: USER_UPDATE_FAIL,
              payload: error.response.data.error,
            });
          }
          // some times response will be an array of error objects
          if (error.response.data.errors) {
            dispatch({
              type: USER_UPDATE_FAIL,
              payload: error.response.data.errors,
            });
          }
        }

      }
      else {
        if (getLocalStorage('user')) {
          removeLocalStorage('user');
        }
        dispatch({
          type: SIGN_OUT,
        });
      }
    }
  };

  // UPDATE ADMIN PROFILE
  const UpdateAdmin = async (formData) => {
    setLoading();
    // As this is a private API route, we need to pass
    // JWT Token as Bearer token via Axios Header while calling the end point

    // So first check the existance of token from cookie
    // if not exists, then signout
    // if exists, then  grab the token from our cookie


    if (window !== 'undefined') {
      if (getCookie('token')) {
        const token = getCookie("token");
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        };
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API}/admin`,
            formData,
            config
          );

          /*
          Once the UPDATE is successful, we need to -
          store the updated user object returned as axios response in our LocalStorage's user object
          */
          setLocalStorage('user', response.data.user);

          dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: response.data.user,
          });
        } catch (error) {
          // some times response will be a single string of error
          if (error.response.data.error) {
            dispatch({
              type: USER_UPDATE_FAIL,
              payload: error.response.data.error,
            });
          }
          // some times response will be an array of error objects
          if (error.response.data.errors) {
            dispatch({
              type: USER_UPDATE_FAIL,
              payload: error.response.data.errors,
            });
          }
        }

      }
      else {
        if (getLocalStorage('user')) {
          removeLocalStorage('user');
        }
        dispatch({
          type: SIGN_OUT,
        });
      }
    }
  };

  //Forgot Password

  const ForgotPassword = async (formData) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/forgot-password`,
        formData,
        config
      );
      dispatch({
        type: FORGOT_PASSWORD_MAIL_SUCCESS,
        payload: response.data.message,
      });

    } catch (error) {
      // some times response will be a single string of error
      if (error.response.data.error) {
        dispatch({
          type: FORGOT_PASSWORD_MAIL_FAILED,
          payload: error.response.data.error,
        });
      }
      // some times response will be an array of error objects
      if (error.response.data.errors) {
        dispatch({
          type: FORGOT_PASSWORD_MAIL_FAILED,
          payload: error.response.data.errors,
        });
      }
    }
  };


// RESET PASSWORD
const ResetPassword = async (formData) => {
  setLoading();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/reset-password`,
      formData,
      config
    );
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: response.data.message,
    });

  } catch (error) {
    // some times response will be a single string of error
    if (error.response.data.error) {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: error.response.data.error,
      });
    }
    // some times response will be an array of error objects
    if (error.response.data.errors) {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: error.response.data.errors,
      });
    }
  }
};


  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const clearMessages = () => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  return (
    <authContext.Provider
      value={{
        user_info: state.user_info,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        auth_error: state.auth_error,
        auth_message: state.auth_message,
        SignUp,
        ActivateAccount,
        SignIn,
        isAuthUser,
        SignOut,
        UpdateUser,
        UpdateAdmin,
        ForgotPassword,
        ResetPassword,
        setLoading,
        clearMessages,
        clearErrors,

      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
