import { ACTIVE, GET_ALL_PROGRAM_OUTCOMES, CLEAR_PROGRAM_OUTCOME, GET_ALL_ACTIVE_PROGRAM_OUTCOMES, UPDATE_PROGRAM_OUTCOME, CREATE_PROGRAM_OUTCOME, GET_PROGRAM_OUTCOME, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    programOutcomes: {content:[], page: 0},
    activeProgramOutcomes: [],
    programOutcome: {code: '', department_id: '', explanation: '', year_and_term: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_PROGRAM_OUTCOMES}${PENDING}`: {
            return {
                    ...state,
                    activeProgramOutcomes: []
            };
        }
        case `${GET_ALL_ACTIVE_PROGRAM_OUTCOMES}${FULFILLED}`: {
            return {
                ...state,
                activeProgramOutcomes: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_PROGRAM_OUTCOMES}${REJECTED}`: {
            return {
                ...state,
                activeProgramOutcomes: []
            };
        }
        case `${GET_ALL_PROGRAM_OUTCOMES}${PENDING}`: {
            return {
                    ...state,
                    programOutcomes: {content:[], page: 0}
            };
        }
        case `${GET_ALL_PROGRAM_OUTCOMES}${FULFILLED}`: {
            return {
                ...state,
                programOutcomes: action.payload
            };
        }
        case `${GET_ALL_PROGRAM_OUTCOMES}${REJECTED}`: {
            return {
                ...state,
                programOutcomes: {content:[], page: 0}
            };
        }
        case `${GET_PROGRAM_OUTCOME}${PENDING}`: {
            return {
                    ...state,
                    programOutcome: {code: '', department_id: '', explanation: '', year_and_term: ''}
            };
        }
        case `${GET_PROGRAM_OUTCOME}${FULFILLED}`: {
            return {
                ...state,
                programOutcome: action.payload
            };
        }
        case `${GET_PROGRAM_OUTCOME}${REJECTED}`: {
            return {
                ...state,
                programOutcome: {code: '', department_id: '', explanation: '', year_and_term: ''}
            };
        }
        case `${UPDATE_PROGRAM_OUTCOME}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_PROGRAM_OUTCOME}${FULFILLED}`: {
            return {
                ...state,
                programOutcome: action.payload
            };
        }
        case `${UPDATE_PROGRAM_OUTCOME}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_PROGRAM_OUTCOME}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_PROGRAM_OUTCOME}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_PROGRAM_OUTCOME}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_PROGRAM_OUTCOME}`: {
            return {
                ...state,
                programOutcome: {code: '', department_id: '', explanation: '', year_and_term: ''}
            };
        }
        default: return state;
    }
  }