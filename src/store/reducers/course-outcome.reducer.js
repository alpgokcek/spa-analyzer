import { ACTIVE, GET_ALL_COURSE_OUTCOMES, CLEAR_COURSE_OUTCOME, GET_ALL_ACTIVE_COURSE_OUTCOMES, UPDATE_COURSE_OUTCOME, CREATE_COURSE_OUTCOME, GET_COURSE_OUTCOME, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    courseOutcomes: {content:[], page: 0},
    activeCourseOutcomes: [],
    courseOutcome: {code: '', course_id: '', explanation: '', measured_average: '', survey_average: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_COURSE_OUTCOMES}${PENDING}`: {
            return {
                    ...state,
                    activeCourseOutcomes: []
            };
        }
        case `${GET_ALL_ACTIVE_COURSE_OUTCOMES}${FULFILLED}`: {
            return {
                ...state,
                activeCourseOutcomes: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_COURSE_OUTCOMES}${REJECTED}`: {
            return {
                ...state,
                activeCourseOutcomes: []
            };
        }
        case `${GET_ALL_COURSE_OUTCOMES}${PENDING}`: {
            return {
                    ...state,
                    courseOutcomes: {content:[], page: 0}
            };
        }
        case `${GET_ALL_COURSE_OUTCOMES}${FULFILLED}`: {
            return {
                ...state,
                courseOutcomes: action.payload
            };
        }
        case `${GET_ALL_COURSE_OUTCOMES}${REJECTED}`: {
            return {
                ...state,
                courseOutcomes: {content:[], page: 0}
            };
        }
        case `${GET_COURSE_OUTCOME}${PENDING}`: {
            return {
                    ...state,
                    courseOutcome: {code: '', course_id: '', explanation: '', measured_average: '', survey_average: ''}
            };
        }
        case `${GET_COURSE_OUTCOME}${FULFILLED}`: {
            return {
                ...state,
                courseOutcome: action.payload
            };
        }
        case `${GET_COURSE_OUTCOME}${REJECTED}`: {
            return {
                ...state,
                courseOutcome: {code: '', course_id: '', explanation: '', measured_average: '', survey_average: ''}
            };
        }
        case `${UPDATE_COURSE_OUTCOME}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_COURSE_OUTCOME}${FULFILLED}`: {
            return {
                ...state,
                courseOutcome: action.payload
            };
        }
        case `${UPDATE_COURSE_OUTCOME}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_COURSE_OUTCOME}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_COURSE_OUTCOME}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_COURSE_OUTCOME}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_COURSE_OUTCOME}`: {
            return {
                ...state,
                courseOutcome: {code: '', course_id: '', explanation: '', measured_average: '', survey_average: ''}
            };
        }
        default: return state;
    }
  }