import { CHANGE_THEME } from 'Actions';

const initialState = {
    path: ''
}

const themesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                path: action.path
            }
        default:
            return state;
    }
}

export default themesReducer;