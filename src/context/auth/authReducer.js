import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACCOUNT_ACTIVATION_SUCCESS,
  ACCOUNT_ACTIVATION_FAIL,
  SET_LOADING,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
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

export default (state, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        auth_message: action.payload,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        message: '',
        auth_error: action.payload,
      };

    case ACCOUNT_ACTIVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        auth_message: action.payload,
      };
    case ACCOUNT_ACTIVATION_FAIL:
      return {
        ...state,
        loading: false,
        message: '',
        auth_error: action.payload,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        auth_message: 'successfully logged in',
        isAuthenticated: true,
        user_info: action.payload,
      };

    case SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        auth_message: '',
        auth_error: action.payload,
        isAuthenticated: null,
        user_info: null,
      };

    case USER_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user_info: action.payload,
      };

    case USER_AUTH_FAIL:
    case SIGN_OUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: null,
        user_info: null,
      };

      case USER_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          auth_message: 'successfully updated',
          isAuthenticated: true,
          user_info: action.payload,
        };

      case USER_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          auth_message: '',
          auth_error: action.payload,
        };

      case FORGOT_PASSWORD_MAIL_SUCCESS:
      case RESET_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false,
            isAuthenticated: null,
            user_info: null,
            auth_message: action.payload,
            auth_error: null,

          };

      case FORGOT_PASSWORD_MAIL_FAILED:
      case RESET_PASSWORD_FAILED:
            return {
              ...state,
              loading: false,
              isAuthenticated: null,
              user_info: null,
              auth_error: action.payload,
              auth_message: null,
            };


    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        auth_error: null,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        auth_message: null,
      };

    default:
      return state;
  }
};
