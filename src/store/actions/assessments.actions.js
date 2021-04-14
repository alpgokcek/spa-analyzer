import { GET_ALL_ASSESSMENTS, GET_ALL_ACTIVE_ASSESSMENTS, GET_ASSESSMENT, LOGOUT, UPDATE_ASSESSMENT, CREATE_ASSESSMENT, CLEAR_ASSESSMENT, SUCCESS_TOAST, ERROR_TOAST, DELETE_ASSESSMENT} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';

const PATH = '/assessment'

export const getAllActiveAssessments = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_ASSESSMENTS,
          payload: axiosInstance.get(`${PATH}`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınavlar', 'GET')}`);
        });
    };
}

export const getAllAssessments = (course_id='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ASSESSMENTS,
          payload: axiosInstance.get(`${PATH}${course_id && `?course=${course_id}`}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav', 'GET')}`);
        });
    };
}

export const getAssessment = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ASSESSMENT,
          payload: axiosInstance.get(`${PATH}/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav', 'GET')}`);
        });
    };
}


export const createAssessment = (assessment) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_ASSESSMENT,
          payload: axiosInstance.post(`${PATH}`, assessment).then(async res => {
            toast.success(`${SUCCESS_TOAST('Sınav', true)}`);
            history.push(`/assessments/${assessment.course_id}`)
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllAssessments(assessment.course_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav', 'POST')}`);
        });
    };
}
export const updateAssessment = (id, assessment) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_ASSESSMENT,
          payload: axiosInstance.put(`${PATH}/${id}`, assessment).then(async res => {
            history.push(`/assessments/${assessment.course_id}`)
            toast.success(`${SUCCESS_TOAST('Sınav', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllAssessments(assessment.course_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav', 'PUT')}`);
        });
    };
}

export const deleteAssessment = (id, course_id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_ASSESSMENT,
        payload: axiosInstance.delete(`${PATH}/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Sınav', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllAssessments(course_id));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Sınav', 'DELETE')}`);
      });
  };
}

export const clearAssessment = () => {
  return {
    type: CLEAR_ASSESSMENT
  };
};
