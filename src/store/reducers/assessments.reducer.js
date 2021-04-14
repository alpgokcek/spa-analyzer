import { ACTIVE, GET_ALL_ASSESSMENTS, CLEAR_ASSESSMENT, GET_ALL_ACTIVE_ASSESSMENTS, UPDATE_ASSESSMENT, CREATE_ASSESSMENT, GET_ASSESSMENT, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    assessments: {content:[], page: 0},
    activeAssessments: [],
    assessment: {name: '', course_id: '', percentage: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_ASSESSMENTS}${PENDING}`: {
            return {
                    ...state,
                    activeAssessments: []
            };
        }
        case `${GET_ALL_ACTIVE_ASSESSMENTS}${FULFILLED}`: {
            return {
                ...state,
                activeAssessments: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_ASSESSMENTS}${REJECTED}`: {
            return {
                ...state,
                activeAssessments: []
            };
        }
        case `${GET_ALL_ASSESSMENTS}${PENDING}`: {
            return {
                    ...state,
                    assessments: {content:[], page: 0}
            };
        }
        case `${GET_ALL_ASSESSMENTS}${FULFILLED}`: {
            return {
                ...state,
                assessments: action.payload
            };
        }
        case `${GET_ALL_ASSESSMENTS}${REJECTED}`: {
            return {
                ...state,
                assessments: {content:[], page: 0}
            };
        }
        case `${GET_ASSESSMENT}${PENDING}`: {
            return {
                    ...state,
                    assessment: {name: '', course_id: '', percentage: ''}
            };
        }
        case `${GET_ASSESSMENT}${FULFILLED}`: {
            return {
                ...state,
                assessment: action.payload
            };
        }
        case `${GET_ASSESSMENT}${REJECTED}`: {
            return {
                ...state,
                assessment: {name: '', course_id: '', percentage: ''}
            };
        }
        case `${UPDATE_ASSESSMENT}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_ASSESSMENT}${FULFILLED}`: {
            return {
                ...state,
                assessment: action.payload
            };
        }
        case `${UPDATE_ASSESSMENT}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_ASSESSMENT}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_ASSESSMENT}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_ASSESSMENT}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_ASSESSMENT}`: {
            return {
                ...state,
                assessment: {name: '', course_id: '', percentage: ''}
            };
        }
        default: return state;
    }
  }