import { GET_ALL_STUDENTS_TAKE_SECTIONS, GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS, GET_STUDENTS_TAKE_SECTIONS, LOGOUT, UPDATE_STUDENTS_TAKE_SECTIONS, CREATE_STUDENTS_TAKE_SECTIONS, CLEAR_STUDENTS_TAKE_SECTIONS, SUCCESS_TOAST, ERROR_TOAST, DELETE_STUDENTS_TAKE_SECTIONS } from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllActiveStudentsTakeSections = (query='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_STUDENTS_TAKE_SECTIONS,
          payload: axiosInstance.get(`/sts${query}`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}

export const getAllStudentsTakeSections = (query='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_STUDENTS_TAKE_SECTIONS,
          payload: axiosInstance.get(`/sts${query}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}

export const getStudentsTakeSections = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_STUDENTS_TAKE_SECTIONS,
          payload: axiosInstance.get(`/sts/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}


export const createStudentsTakeSections = (stsObj) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_STUDENTS_TAKE_SECTIONS,
          payload: axiosInstance.post(`/sts`, stsObj).then(async res => {
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
export const updateStudentsTakeSections = (id, stsObj) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_STUDENTS_TAKE_SECTIONS,
          payload: axiosInstance.put(`/sts/${id}`, stsObj).then(async res => {
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

export const deleteStudentsTakeSections = (id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_STUDENTS_TAKE_SECTIONS,
        payload: axiosInstance.delete(`/sts/${id}`).then(async res => {
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

export const clearStudentsTakeSections = () => {
  return {
    type: CLEAR_STUDENTS_TAKE_SECTIONS  };
};
