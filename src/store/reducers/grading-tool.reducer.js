import { ACTIVE, GET_ALL_GRADING_TOOLS, CLEAR_GRADING_TOOL, GET_ALL_ACTIVE_GRADING_TOOLS, UPDATE_GRADING_TOOL, CREATE_GRADING_TOOL, GET_GRADING_TOOL, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    gradingTools: {content:[], page: 0},
    activeGradingTools: [],
    gradingTool: {question_number: '', assessment_id: '', percentage: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_GRADING_TOOLS}${PENDING}`: {
            return {
                    ...state,
                    activeGradingTools: []
            };
        }
        case `${GET_ALL_ACTIVE_GRADING_TOOLS}${FULFILLED}`: {
            return {
                ...state,
                activeGradingTools: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_GRADING_TOOLS}${REJECTED}`: {
            return {
                ...state,
                activeGradingTools: []
            };
        }
        case `${GET_ALL_GRADING_TOOLS}${PENDING}`: {
            return {
                    ...state,
                    gradingTools: {content:[], page: 0}
            };
        }
        case `${GET_ALL_GRADING_TOOLS}${FULFILLED}`: {
            return {
                ...state,
                gradingTools: action.payload
            };
        }
        case `${GET_ALL_GRADING_TOOLS}${REJECTED}`: {
            return {
                ...state,
                gradingTools: {content:[], page: 0}
            };
        }
        case `${GET_GRADING_TOOL}${PENDING}`: {
            return {
                    ...state,
                    gradingTool: {question_number: '', assessment_id: '', percentage: ''}
            };
        }
        case `${GET_GRADING_TOOL}${FULFILLED}`: {
            return {
                ...state,
                gradingTool: action.payload
            };
        }
        case `${GET_GRADING_TOOL}${REJECTED}`: {
            return {
                ...state,
                gradingTool: {question_number: '', assessment_id: '', percentage: ''}
            };
        }
        case `${UPDATE_GRADING_TOOL}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_GRADING_TOOL}${FULFILLED}`: {
            return {
                ...state,
                gradingTool: action.payload
            };
        }
        case `${UPDATE_GRADING_TOOL}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_GRADING_TOOL}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_GRADING_TOOL}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_GRADING_TOOL}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_GRADING_TOOL}`: {
            return {
                ...state,
                gradingTool: {question_number: '', assessment_id: '', percentage: ''}
            };
        }
        default: return state;
    }
  }