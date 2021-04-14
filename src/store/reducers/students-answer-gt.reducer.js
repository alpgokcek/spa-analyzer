import { GET_ALL_SAGT, CLEAR_SAGT, UPDATE_SAGT, CREATE_SAGT, GET_SAGT, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    sagtList: [],
    sagt: {student_id: '', grading_tool_id: '', grade: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_SAGT}${PENDING}`: {
            return {
                    ...state,
                    sagtList: []
            };
        }
        case `${GET_ALL_SAGT}${FULFILLED}`: {
            return {
                ...state,
                sagtList: action.payload
            };
        }
        case `${GET_ALL_SAGT}${REJECTED}`: {
            return {
                ...state,
                sagtList: []
            };
        }
        case `${GET_SAGT}${PENDING}`: {
            return {
                ...state,
                sagt: {student_id: '', grading_tool_id: '', grade: ''}
            };
        }
        case `${GET_SAGT}${FULFILLED}`: {
            return {
                ...state,
                sagt: action.payload
            };
        }
        case `${GET_SAGT}${REJECTED}`: {
            return {
                ...state,
                sagt: {student_id: '', grading_tool_id: '', grade: ''}
            };
        }
        case `${UPDATE_SAGT}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_SAGT}${FULFILLED}`: {
            return {
                ...state,
                sagt: action.payload
            };
        }
        case `${UPDATE_SAGT}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_SAGT}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_SAGT}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_SAGT}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_SAGT}`: {
            return {
                ...state,
                sagt: {student_id: '', grading_tool_id: '', grade: ''}
            };
        }
        default: return state;
    }
  }