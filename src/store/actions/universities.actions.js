import { GET_ALL_UNIVERSITIES, LOGOUT, SUCCESS_TOAST, ERROR_TOAST} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllUniversities = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_UNIVERSITIES,
          payload: axiosInstance.get(`/university`).then(async res => {return { content: [...res.data.data], page: res.data.count }} )}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Üniversite', 'GET')}`);
        });
    };
}
