import { GET_ALL_COURSE_OUTCOMES, GET_ALL_ACTIVE_COURSE_OUTCOMES, GET_COURSE_OUTCOME, LOGOUT, UPDATE_COURSE_OUTCOME, CREATE_COURSE_OUTCOME, CLEAR_COURSE_OUTCOME, SUCCESS_TOAST, ERROR_TOAST, DELETE_COURSE_OUTCOME} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';
import { getAllProgramOutcomes } from './program-outcomes.actions';

const PATH = '/course-outcome'

export const getAllActiveCourseOutcomes = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_COURSE_OUTCOMES,
          payload: axiosInstance.get(`${PATH}`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders çıktısı', 'GET')}`);
        });
    };
}

export const getAllCourseOutcomes = (course_id='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_COURSE_OUTCOMES,
          payload: axiosInstance.get(`${PATH}${course_id && `?course=${course_id}`}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders çıktısı', 'GET')}`);
        });
    };
}

export const getCourseOutcome = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_COURSE_OUTCOME,
          payload: axiosInstance.get(`${PATH}/${id}`).then(async res => res.data.data)}))
          .then(data=> dispatch(getAllProgramOutcomes(data.value.department_id)))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders çıktısı', 'GET')}`);
        });
    };
}

export const createCourseOutcome = (course_outcome) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_COURSE_OUTCOME,
          payload: axiosInstance.post(`${PATH}`, course_outcome).then(async res => {
            toast.success(`${SUCCESS_TOAST('Ders çıktısı', true)}`);
            history.push(`/course-outcomes/${course_outcome.course_id}`)
            return res.data
          })
        }
        )).then(data => {
          dispatch(getAllCourseOutcomes(course_outcome.course_id));
          return data
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders çıktısı', 'POST')}`);
        });
    };
}
export const updateCourseOutcome = (id, course_outcome) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_COURSE_OUTCOME,
          payload: axiosInstance.put(`${PATH}/${id}`, course_outcome).then(async res => {
            history.push(`/course-outcomes/${course_outcome.course_id}`)
            toast.success(`${SUCCESS_TOAST('Ders çıktısı', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllCourseOutcomes(course_outcome.course_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders çıktısı', 'PUT')}`);
        });
    };
}

export const deleteCourseOutcome = (id, course_id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_COURSE_OUTCOME,
        payload: axiosInstance.delete(`${PATH}/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Ders çıktısı', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllCourseOutcomes(course_id));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Ders çıktısı', 'DELETE')}`);
      });
  };
}

export const clearCourseOutcome = () => {
  return {
    type: CLEAR_COURSE_OUTCOME
  };
};
