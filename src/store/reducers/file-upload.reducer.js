import { ACTIVE, CLEAR_FILE, UPLOAD_FILE, PENDING, FULFILLED, REJECTED } from 'AppConstants';
  
  const initialState = {
    file: {title: '', status: ACTIVE}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
        case `${UPLOAD_FILE}${PENDING}`: {
            return {
                    ...state
            };
        }
        case `${UPLOAD_FILE}${FULFILLED}`: {
            return {
                ...state
            };
        }
        case `${UPLOAD_FILE}${REJECTED}`: {
            return {
                ...state
            };
        }
        case `${CLEAR_FILE}`: {
            return {
                ...state,
                file: {fileUrl: '', status: ACTIVE}
            };
        }
        default: return state;
    }
  }