import { ACTIVE, GET_ALL_DEPARTMENTS, CLEAR_DEPARTMENT, GET_ALL_ACTIVE_DEPARTMENTS, UPDATE_DEPARTMENT, CREATE_DEPARTMENT, GET_DEPARTMENT, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    departments: {content:[], page: 0},
    activeDepartments: [],
    department: {name: '', status: ACTIVE}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_DEPARTMENTS}${PENDING}`: {
            return {
                    ...state,
                    activeDepartments: []
            };
        }
        case `${GET_ALL_ACTIVE_DEPARTMENTS}${FULFILLED}`: {
            return {
                ...state,
                activeDepartments: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_DEPARTMENTS}${REJECTED}`: {
            return {
                ...state,
                activeDepartments: []
            };
        }
        case `${GET_ALL_DEPARTMENTS}${PENDING}`: {
            return {
                    ...state,
                    departments: {content:[], page: 0}
            };
        }
        case `${GET_ALL_DEPARTMENTS}${FULFILLED}`: {
            return {
                ...state,
                departments: action.payload
            };
        }
        case `${GET_ALL_DEPARTMENTS}${REJECTED}`: {
            return {
                ...state,
                departments: {content:[], page: 0}
            };
        }
        case `${GET_DEPARTMENT}${PENDING}`: {
            return {
                    ...state,
                    department: {name: '', status: ACTIVE}
            };
        }
        case `${GET_DEPARTMENT}${FULFILLED}`: {
            return {
                ...state,
                department: action.payload
            };
        }
        case `${GET_DEPARTMENT}${REJECTED}`: {
            return {
                ...state,
                department: {name: '', status: ACTIVE}
            };
        }
        case `${UPDATE_DEPARTMENT}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_DEPARTMENT}${FULFILLED}`: {
            return {
                ...state,
                department: action.payload
            };
        }
        case `${UPDATE_DEPARTMENT}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_DEPARTMENT}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_DEPARTMENT}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_DEPARTMENT}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_DEPARTMENT}`: {
            return {
                ...state,
                department: {name: '', status: ACTIVE}
            };
        }
        default: return state;
    }
  }