import { ACTIVE, GET_ALL_INSTRUCTORS_GIVE_SECTIONS, CLEAR_INSTRUCTORS_GIVE_SECTIONS, GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS, UPDATE_INSTRUCTORS_GIVE_SECTIONS, CREATE_INSTRUCTORS_GIVE_SECTIONS, GET_INSTRUCTORS_GIVE_SECTIONS, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    instructorsGiveSectionsList: {content:[], page: 0},
    activeInstructorsGiveSectionsList: [],
    instructorsGiveSections: {instructor_id: '', section_id: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    activeInstructorsGiveSectionsList: []
            };
        }
        case `${GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                activeInstructorsGiveSectionsList: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                activeInstructorsGiveSectionsList: []
            };
        }
        case `${GET_ALL_INSTRUCTORS_GIVE_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    instructorsGiveSectionsList: {content:[], page: 0}
            };
        }
        case `${GET_ALL_INSTRUCTORS_GIVE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                instructorsGiveSectionsList: action.payload
            };
        }
        case `${GET_ALL_INSTRUCTORS_GIVE_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                instructorsGiveSectionsList: {content:[], page: 0}
            };
        }
        case `${GET_INSTRUCTORS_GIVE_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    instructorsGiveSections: {instructor_id: '', section_id: ''}
            };
        }
        case `${GET_INSTRUCTORS_GIVE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                instructorsGiveSections: action.payload
            };
        }
        case `${GET_INSTRUCTORS_GIVE_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                instructorsGiveSections: {instructor_id: '', section_id: ''}
            };
        }
        case `${UPDATE_INSTRUCTORS_GIVE_SECTIONS}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_INSTRUCTORS_GIVE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                instructorsGiveSections: action.payload
            };
        }
        case `${UPDATE_INSTRUCTORS_GIVE_SECTIONS}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_INSTRUCTORS_GIVE_SECTIONS}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_INSTRUCTORS_GIVE_SECTIONS}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_INSTRUCTORS_GIVE_SECTIONS}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_INSTRUCTORS_GIVE_SECTIONS}`: {
            return {
                ...state,
                instructorsGiveSections: {instructor_id: '', section_id: ''}
            };
        }
        default: return state;
    }
  }