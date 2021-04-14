import { ACTIVE, GET_ALL_STUDENTS_TAKE_SECTIONS, CLEAR_STUDENTS_TAKE_SECTIONS, GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS, UPDATE_STUDENTS_TAKE_SECTIONS, CREATE_STUDENTS_TAKE_SECTIONS, GET_STUDENTS_TAKE_SECTIONS, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    studentsTakeSectionsList: {content:[], page: 0},
    activeStudentsTakeSectionsList: [],
    studentsTakeSections: {student_id: '', section_id: '', letter_grade: '', average: ''}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    activeStudentsTakeSectionsList: []
            };
        }
        case `${GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                activeStudentsTakeSectionsList: action.payload
            };
        }
        case `${GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                activeStudentsTakeSectionsList: []
            };
        }
        case `${GET_ALL_STUDENTS_TAKE_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    studentsTakeSectionsList: {content:[], page: 0}
            };
        }
        case `${GET_ALL_STUDENTS_TAKE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                studentsTakeSectionsList: action.payload
            };
        }
        case `${GET_ALL_STUDENTS_TAKE_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                studentsTakeSectionsList: {content:[], page: 0}
            };
        }
        case `${GET_STUDENTS_TAKE_SECTIONS}${PENDING}`: {
            return {
                    ...state,
                    studentsTakeSections: {student_id: '', section_id: '', letter_grade: '', average: ''}
            };
        }
        case `${GET_STUDENTS_TAKE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                studentsTakeSections: action.payload
            };
        }
        case `${GET_STUDENTS_TAKE_SECTIONS}${REJECTED}`: {
            return {
                ...state,
                studentsTakeSections: {student_id: '', section_id: '', letter_grade: '', average: ''}
            };
        }
        case `${UPDATE_STUDENTS_TAKE_SECTIONS}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPDATE_STUDENTS_TAKE_SECTIONS}${FULFILLED}`: {
            return {
                ...state,
                studentsTakeSections: action.payload
            };
        }
        case `${UPDATE_STUDENTS_TAKE_SECTIONS}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_STUDENTS_TAKE_SECTIONS}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${CREATE_STUDENTS_TAKE_SECTIONS}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_STUDENTS_TAKE_SECTIONS}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_STUDENTS_TAKE_SECTIONS}`: {
            return {
                ...state,
                studentsTakeSections: {student_id: '', section_id: '', letter_grade: '', average: ''}
            };
        }
        default: return state;
    }
  }