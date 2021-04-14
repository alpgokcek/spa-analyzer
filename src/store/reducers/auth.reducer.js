import { LOGIN, LOGOUT, PASSWORD_FORGOT, PASSWORD_RESET, PASSWORD_SET, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    isAuthenticated: !!localStorage.getItem('access_token'),
    access_token: localStorage.getItem('access_token'),
    name: null,
    id: null,
    roles: null,
    status: null,
    email: null,
    error: null
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case `${LOGIN}${PENDING}`: {
        localStorage.removeItem('access_token');
        return {
          isAuthenticated: false,
          access_token: null,
          name: null,
          id: null,
          roles: null,
          email: null,
          error: null
        };
      }
      case `${LOGIN}${FULFILLED}`: {
        localStorage.setItem('access_token', action.payload.access_token);
        return {
          ...action.payload,
          isAuthenticated: true
        }
      }
      case `${LOGIN}${REJECTED}`: {
        localStorage.removeItem('access_token');
        return {
          isAuthenticated: false,
          access_token: null,
          name: null,
          id: null,
          roles: null,
          email: null,
          error: action.payload
        };
      }
      case `${LOGOUT}`: {
        localStorage.removeItem('access_token');
        return {
          access_token: null,
          isAuthenticated: false
        };
      }
      case `${PASSWORD_FORGOT}${PENDING}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_FORGOT}${FULFILLED}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_FORGOT}${REJECTED}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_RESET}${PENDING}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_RESET}${FULFILLED}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_RESET}${REJECTED}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_SET}${PENDING}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_SET}${FULFILLED}`: {
        return {...state, error: null};
      }
      case `${PASSWORD_SET}${REJECTED}`: {
        return {...state, error: null};
      }
      default:
        return state;
    }
  }