import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';
import { getMyInfo } from '../services/user';
// config
import { PATH_PAGE } from '../routes/paths';
import { LOGIN_STEPS, AUTH_STATUS } from '../config-global';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  isApplicationPrepared: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      isApplicationPrepared: action.payload.isApplicationPrepared,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'UPDATE') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { push, asPath, replace } = useRouter();

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const response = await getMyInfo();
        const resStatus = response.status;
        if (resStatus) {
          if (resStatus === 200) {
            const { user } = response.data;

            let isApplicationPrepared = false;
            switch (user.auth_status) {
              case AUTH_STATUS.WAIT_MAIL_VERIFYING:
                if (!window.location.search) {
                  push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.MAIL_VERIFYING));
                }
                break;
              case AUTH_STATUS.MAIL_VERIFIED:
                push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.UPLOAD_PHOTO));
                break;
              case AUTH_STATUS.AVATAR_UPLOADED:
                push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.UPLOAD_ID_FRONT));
                break;
              case AUTH_STATUS.ID_VERIFIED:
                push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.COMPLETE));
                isApplicationPrepared = true;
                break;
              default:
                // eslint-disable-next-line no-case-declarations
                const { pathname } = window.location;
                if (pathname.includes('users')) {
                  push(PATH_PAGE.home.root);
                }
                isApplicationPrepared = true;
                break;
            }

            dispatch({
              type: 'INITIAL',
              payload: {
                isAuthenticated: true,
                isApplicationPrepared,
                user,
              },
            });
          } else {
            throw new Error('Bad request');
          }
        } else {
          throw new Error('Internal Server Error');
        }
      } else {
        throw new Error('Token is not existed or token is invalied');
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          isApplicationPrepared: false,
          user: null,
        },
      });
      if (!window.location.pathname.includes(LOGIN_STEPS.SIGN_UP))
        push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.SIGN_IN));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const path = (/#!(\/.*)$/.exec(asPath) || [])[1];
    if (path) {
      replace(path);
    }
    if (asPath === `${PATH_PAGE.users.root}/`) {
      initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    console.log(email);
    const response = await axios.post('/users/signin/', {
      email,
      password,
    });
    const { tokenObj, user } = response.data;

    setSession(tokenObj.access);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, username, password) => {
    const [first_name, last_name = ''] = username.split(' ');
    const registerResponse = await axios.post('/users/signup/', {
      email,
      username,
      first_name,
      last_name,
      password,
    });
    if (registerResponse.status === 201) {
      const loginResponse = await axios.post('/users/signin/', {
        email,
        password,
      });
      const { tokenObj, user } = loginResponse.data;

      setSession(tokenObj.access);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    }
  }, []);

  // UPDATE USERDATA
  const updateUser = useCallback(async () => {
    try {
      const resData = await getMyInfo();
      dispatch({
        type: 'UPDATE',
        payload: {
          user: resData.data.user,
        },
      });
    } catch (error) {
      setSession(null);
      dispatch({
        type: 'LOGOUT',
      });
    }
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      isApplicationPrepared: state.isApplicationPrepared,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
      updateUser,
    }),
    [
      state.isAuthenticated,
      state.isApplicationPrepared,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
      updateUser,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
