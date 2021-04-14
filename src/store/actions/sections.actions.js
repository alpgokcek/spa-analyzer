import { GET_ALL_SECTIONS, GET_ALL_ACTIVE_SECTIONS, GET_SECTION, LOGOUT, UPDATE_SECTION, CREATE_SECTION, CLEAR_SECTION, SUCCESS_TOAST, ERROR_TOAST, DELETE_SECTION} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllActiveSections = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_SECTIONS,
          payload: axiosInstance.get(`/section`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Section', 'GET')}`);
        });
    };
}

export const getAllSections = (course_id='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_SECTIONS,
          payload: axiosInstance.get(`/section${course_id && `?course=${course_id}`}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Section', 'GET')}`);
        });
    };
}

export const getSection = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_SECTION,
          payload: axiosInstance.get(`/section/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Section', 'GET')}`);
        });
    };
}


export const createSection = (section) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_SECTION,
          payload: axiosInstance.post(`/section`, section).then(async res => {
            toast.success(`${SUCCESS_TOAST('Section', true)}`);
            history.push(`/sections/${section.course_id}`)
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllSections(section.course_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Section', 'POST')}`);
        });
    };
}
export const updateSection = (id, section) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_SECTION,
          payload: axiosInstance.put(`/section/${id}`, section).then(async res => {
            history.push(`/sections/${section.course_id}`)
            toast.success(`${SUCCESS_TOAST('Section', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllSections(section.course_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Section', 'PUT')}`);
        });
    };
}

export const deleteSection = (id, course_id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_SECTION,
        payload: axiosInstance.delete(`/section/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Section', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllSections(course_id));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Section', 'DELETE')}`);
      });
  };
}

export const clearSection = () => {
  return {
    type: CLEAR_SECTION
  };
};
