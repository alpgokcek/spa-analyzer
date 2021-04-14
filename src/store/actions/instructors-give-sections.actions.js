import { GET_ALL_INSTRUCTORS_GIVE_SECTIONS, GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS, GET_INSTRUCTORS_GIVE_SECTIONS, LOGOUT, UPDATE_INSTRUCTORS_GIVE_SECTIONS, CREATE_INSTRUCTORS_GIVE_SECTIONS, CLEAR_INSTRUCTORS_GIVE_SECTIONS, SUCCESS_TOAST, ERROR_TOAST, DELETE_INSTRUCTORS_GIVE_SECTIONS } from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllActiveInstructorsGiveSections = (query='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_INSTRUCTORS_GIVE_SECTIONS,
          payload: axiosInstance.get(`/igs${query}`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}

export const getAllInstructorsGiveSections = (query='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_INSTRUCTORS_GIVE_SECTIONS,
          payload: axiosInstance.get(`/igs${query}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}

export const getInstructorsGiveSections = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_INSTRUCTORS_GIVE_SECTIONS,
          payload: axiosInstance.get(`/igs/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}


export const createInstructorsGiveSections = (igsObj) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_INSTRUCTORS_GIVE_SECTIONS,
          payload: axiosInstance.post(`/igs`, igsObj).then(async res => {
            toast.success(`${SUCCESS_TOAST('Öğrenci çıktısı', true)}`);
            history.goBack()
            return res.data
          })
        }
        )).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'POST')}`);
        });
    };
}
export const updateInstructorsGiveSections = (id, igsObj) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_INSTRUCTORS_GIVE_SECTIONS,
          payload: axiosInstance.put(`/igs/${id}`, igsObj).then(async res => {
            history.goBack()
            toast.success(`${SUCCESS_TOAST('Öğrenci çıktısı', false)}`);
            return res.data
          })
        }
        )).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'PUT')}`);
        });
    };
}

export const deleteInstructorsGiveSections = (id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_INSTRUCTORS_GIVE_SECTIONS,
        payload: axiosInstance.delete(`/igs/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Öğrenci çıktısı', false)}`);
          return res.data
        })
      }
      )).then(arg => {
       window.location.reload()
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'DELETE')}`);
      });
  };
}

export const clearInstructorsGiveSections = () => {
  return {
    type: CLEAR_INSTRUCTORS_GIVE_SECTIONS  };
};
