import { ACTIVE, GET_ALL_UNIVERSITIES, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    universities: {content:[], page: 0},
    university: {name: '', state: ACTIVE}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_UNIVERSITIES}${PENDING}`: {
            return {
                    ...state,
                    universities: {content:[], page: 0}
            };
        }
        case `${GET_ALL_UNIVERSITIES}${FULFILLED}`: {
            return {
                ...state,
                universities: action.payload
            };
        }
        case `${GET_ALL_UNIVERSITIES}${REJECTED}`: {
            return {
                ...state,
                universities: {content:[], page: 0}
            };
        }
        
        default: return state;
    }
  }