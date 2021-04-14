import { GET_ALL_GTCCO, CLEAR_GTCCO, UPDATE_GTCCO, CREATE_GTCCO, GET_GTCCO, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    gtccoList: [],
    gtcco: {course_outcome_id: '', grading_tool_id: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_GTCCO}${PENDING}`: {
            return {
                    ...state,
                    gtccoList: []
            };
        }
        case `${GET_ALL_GTCCO}${FULFILLED}`: {
            return {
                ...state,
                gtccoList: action.payload
            };
        }
        case `${GET_ALL_GTCCO}${REJECTED}`: {
            return {
                ...state,
                gtccoList: []
            };
        }
        case `${GET_GTCCO}${PENDING}`: {
            return {
                ...state,
                gtcco: {course_outcome_id: '', grading_tool_id: ''}
            };
        }
        case `${GET_GTCCO}${FULFILLED}`: {
            return {
                ...state,
                gtcco: action.payload
            };
        }
        case `${GET_GTCCO}${REJECTED}`: {
            return {
                ...state,
                gtcco: {course_outcome_id: '', grading_tool_id: ''}
            };
        }
        case `${UPDATE_GTCCO}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_GTCCO}${FULFILLED}`: {
            return {
                ...state,
                gtcco: action.payload
            };
        }
        case `${UPDATE_GTCCO}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_GTCCO}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_GTCCO}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_GTCCO}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_GTCCO}`: {
            return {
                ...state,
                gtcco: {course_outcome_id: '', grading_tool_id: ''}
            };
        }
        default: return state;
    }
  }