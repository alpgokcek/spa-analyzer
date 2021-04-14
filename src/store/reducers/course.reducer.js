import { ACTIVE, GET_ALL_COURSES, CLEAR_COURSE, GET_ALL_ACTIVE_COURSES, UPDATE_COURSE, CREATE_COURSE, GET_COURSE, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    courses: {content:[], page: 0},
    activeCourses: [],
    course: {title: '', department_id: '', code: '', year_and_term: '', credit: '', status: ACTIVE}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_COURSES}${PENDING}`: {
            return {
                    ...state,
                    activeCourses: []
            };
        }
        case `${GET_ALL_ACTIVE_COURSES}${FULFILLED}`: {
            return {
                ...state,
                activeCourses: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_COURSES}${REJECTED}`: {
            return {
                ...state,
                activeCourses: []
            };
        }
        case `${GET_ALL_COURSES}${PENDING}`: {
            return {
                    ...state,
                    courses: {content:[], page: 0}
            };
        }
        case `${GET_ALL_COURSES}${FULFILLED}`: {
            return {
                ...state,
                courses: action.payload
            };
        }
        case `${GET_ALL_COURSES}${REJECTED}`: {
            return {
                ...state,
                courses: {content:[], page: 0}
            };
        }
        case `${GET_COURSE}${PENDING}`: {
            return {
                    ...state,
                    course: {title: '', department_id: '', code: '', year_and_term: '', credit: '', status: ACTIVE}
            };
        }
        case `${GET_COURSE}${FULFILLED}`: {
            return {
                ...state,
                course: action.payload
            };
        }
        case `${GET_COURSE}${REJECTED}`: {
            return {
                ...state,
                course: {title: '', department_id: '', code: '', year_and_term: '', credit: '', status: ACTIVE}
            };
        }
        case `${UPDATE_COURSE}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_COURSE}${FULFILLED}`: {
            return {
                ...state,
                course: action.payload
            };
        }
        case `${UPDATE_COURSE}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_COURSE}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_COURSE}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_COURSE}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_COURSE}`: {
            return {
                ...state,
                course: {title: '', department_id: '', code: '', year_and_term: '', credit: '', status: ACTIVE}
            };
        }
        default: return state;
    }
  }