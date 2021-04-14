import { GET_ALL_POPCO, CLEAR_POPCO, UPDATE_POPCO, CREATE_POPCO, GET_POPCO, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    popcoList: [],
    popco: {course_outcome_id: '', program_outcome_id: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_POPCO}${PENDING}`: {
            return {
                    ...state,
                    popcoList: []
            };
        }
        case `${GET_ALL_POPCO}${FULFILLED}`: {
            return {
                ...state,
                popcoList: action.payload
            };
        }
        case `${GET_ALL_POPCO}${REJECTED}`: {
            return {
                ...state,
                popcoList: []
            };
        }
        case `${GET_POPCO}${PENDING}`: {
            return {
                ...state,
                popco: {course_outcome_id: '', program_outcome_id: ''}
            };
        }
        case `${GET_POPCO}${FULFILLED}`: {
            return {
                ...state,
                popco: action.payload
            };
        }
        case `${GET_POPCO}${REJECTED}`: {
            return {
                ...state,
                popco: {course_outcome_id: '', program_outcome_id: ''}
            };
        }
        case `${UPDATE_POPCO}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_POPCO}${FULFILLED}`: {
            return {
                ...state,
                popco: action.payload
            };
        }
        case `${UPDATE_POPCO}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_POPCO}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_POPCO}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_POPCO}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_POPCO}`: {
            return {
                ...state,
                popco: {course_outcome_id: '', program_outcome_id: ''}
            };
        }
        default: return state;
    }
  }