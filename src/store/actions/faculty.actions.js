import { GET_ALL_FACULTIES, GET_ALL_ACTIVE_FACULTIES, GET_FACULTY, LOGOUT, UPDATE_FACULTY, CREATE_FACULTY, DELETE_FACULTY, CLEAR_FACULTY, SUCCESS_TOAST, ERROR_TOAST} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllActiveFaculties = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_FACULTIES,
          payload: axiosInstance.get(`/faculty`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Fakülte', 'GET')}`);
        });
    };
}

export const getAllFaculties = (university='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_FACULTIES,
          payload: axiosInstance.get(`/faculty${university && `?university=${university}`}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Fakülte', 'GET')}`);
        });
    };
}

export const getFaculty = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_FACULTY,
          payload: axiosInstance.get(`/faculty/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Fakülte', 'GET')}`);
        });
    };
}


export const createFaculty = (faculty) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_FACULTY,
          payload: axiosInstance.post(`/faculty`, faculty).then(async res => {
            toast.success(`${SUCCESS_TOAST('Fakülte', true)}`);
            history.push('/faculties')
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllFaculties());
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Fakülte', 'POST')}`);
        });
    };
}
export const updateFaculty = (id, faculty) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_FACULTY,
          payload: axiosInstance.put(`/faculty/${id}`, faculty).then(async res => {
            history.push('/faculties')
            toast.success(`${SUCCESS_TOAST('Fakülte', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllFaculties());
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Fakülte', 'PUT')}`);
        });
    };
}

export const deleteFaculty = (id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_FACULTY,
        payload: axiosInstance.delete(`/faculty/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Fakülte', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllFaculties());
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Fakülte', 'DELETE')}`);
      });
  };
}

export const clearFaculty = () => {
  return {
    type: CLEAR_FACULTY
  };
};
