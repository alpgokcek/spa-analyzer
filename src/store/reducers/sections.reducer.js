import { ACTIVE, GET_ALL_SECTIONS, CLEAR_SECTION, GET_ALL_ACTIVE_SECTIONS, UPDATE_SECTION, CREATE_SECTION, GET_SECTION, PENDING, FULFILLED, REJECTED, PASSIVE } from 'AppConstants';
  
  const initialState = {
    sections: {content:[], page: 0},
    activeSections: [],
    section: { title: '', status: ACTIVE, course_id: '', is_file_uploaded: PASSIVE }
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    activeSections: []
            };
        }
        case `${GET_ALL_ACTIVE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                activeSections: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                activeSections: []
            };
        }
        case `${GET_ALL_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    sections: {content:[], page: 0}
            };
        }
        case `${GET_ALL_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                sections: action.payload
            };
        }
        case `${GET_ALL_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                sections: {content:[], page: 0}
            };
        }
        case `${GET_SECTION}${PENDING}`: {
            return {
                    ...state,
                    section: { title: '', status: ACTIVE, course_id: '', is_file_uploaded: PASSIVE }
            };
        }
        case `${GET_SECTION}${FULFILLED}`: {
            return {
                ...state,
                section: action.payload
            };
        }
        case `${GET_SECTION}${REJECTED}`: {
            return {
                ...state,
                section: { title: '', status: ACTIVE, course_id: '', is_file_uploaded: PASSIVE }
            };
        }
        case `${UPDATE_SECTION}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_SECTION}${FULFILLED}`: {
            return {
                ...state,
                section: action.payload
            };
        }
        case `${UPDATE_SECTION}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_SECTION}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_SECTION}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_SECTION}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_SECTION}`: {
            return {
                ...state,
                section: { title: '', status: ACTIVE, course_id: '', is_file_uploaded: PASSIVE }
            };
        }
        default: return state;
    }
  }