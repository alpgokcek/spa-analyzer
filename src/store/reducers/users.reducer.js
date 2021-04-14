import { ACTIVE, GET_ALL_USERS, CLEAR_USER, UPDATE_USER, CREATE_USER, GET_USER, PENDING, FULFILLED, REJECTED, ROLES } from 'AppConstants';
  
  const initialState = {
    users: {content:[], page: 0},
    user: {api_token: "",department_id: "",email: "",faculty_id: "",level: ROLES.STUDENT,name: "",phone: "",photo: "",student_id: "",university: ""}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_USERS}${PENDING}`: {
            return {
                ...state,
                users: {content:[], page: 0}
            };
        }
        case `${GET_ALL_USERS}${FULFILLED}`: {
            return {
                ...state,
                users: action.payload
            };
        }
        case `${GET_ALL_USERS}${REJECTED}`: {
            return {
                ...state,
                users: {content:[], page: 0}
            };
        }
        case `${UPDATE_USER}${PENDING}`: {
            return {
                ...state
            };
        }
        case `${UPDATE_USER}${FULFILLED}`: {
            return {
                ...state,
                user: action.payload
            };
        }
        case `${UPDATE_USER}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CREATE_USER}${PENDING}`: {
            return {
                    ...state            
                };
        }
        case `${CREATE_USER}${FULFILLED}`: {
            return {
                ...state            
            };
        }
        case `${CREATE_USER}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${GET_USER}${PENDING}`: {
            return {
                ...state,
                user: {api_token: "",department_id: "",email: "",faculty_id: "",level: ROLES.STUDENT,name: "",phone: "",photo: "",student_id: "",university: ""}
            };
        }
        case `${GET_USER}${FULFILLED}`: {
            return {
                ...state,
                user: action.payload
            };
        }
        case `${GET_USER}${REJECTED}`: {
            return {
                ...state,
                user: {api_token: "",department_id: "",email: "",faculty_id: "",level: ROLES.STUDENT,name: "",phone: "",photo: "",student_id: "",university: ""}
            };
        }
        case `${CLEAR_USER}`: {
            return {
                ...state,
                user: {api_token: "",department_id: "",email: "",faculty_id: "",level: ROLES.STUDENT,name: "",phone: "",photo: "",student_id: "",university: ""}
            };
        }
        default: return state;
    }
  }