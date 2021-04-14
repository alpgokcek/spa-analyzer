import { ACTIVE, GET_ALL_FACULTIES, CLEAR_FACULTY, GET_ALL_ACTIVE_FACULTIES, UPDATE_FACULTY, CREATE_FACULTY, GET_FACULTY, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    faculties: {content:[], page: 0},
    activeFaculties: [],
    faculty: {title: '', status: ACTIVE}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_FACULTIES}${PENDING}`: {
            return {
                    ...state,
                    activeFaculties: []
            };
        }
        case `${GET_ALL_ACTIVE_FACULTIES}${FULFILLED}`: {
            return {
                ...state,
                activeFaculties: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_FACULTIES}${REJECTED}`: {
            return {
                ...state,
                activeFaculties: []
            };
        }
        case `${GET_ALL_FACULTIES}${PENDING}`: {
            return {
                    ...state,
                    faculties: {content:[], page: 0}
            };
        }
        case `${GET_ALL_FACULTIES}${FULFILLED}`: {
            return {
                ...state,
                faculties: action.payload
            };
        }
        case `${GET_ALL_FACULTIES}${REJECTED}`: {
            return {
                ...state,
                faculties: {content:[], page: 0}
            };
        }
        case `${GET_FACULTY}${PENDING}`: {
            return {
                    ...state,
                    faculty: {title: '', status: ACTIVE}
            };
        }
        case `${GET_FACULTY}${FULFILLED}`: {
            return {
                ...state,
                faculty: action.payload
            };
        }
        case `${GET_FACULTY}${REJECTED}`: {
            return {
                ...state,
                faculty: {title: '', status: ACTIVE}
            };
        }
        case `${UPDATE_FACULTY}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_FACULTY}${FULFILLED}`: {
            return {
                ...state,
                faculty: action.payload
            };
        }
        case `${UPDATE_FACULTY}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_FACULTY}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_FACULTY}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_FACULTY}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_FACULTY}`: {
            return {
                ...state,
                faculty: {title: '', status: ACTIVE}
            };
        }
        default: return state;
    }
  }