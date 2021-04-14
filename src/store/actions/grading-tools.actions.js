import { GET_ALL_GRADING_TOOLS, GET_ALL_ACTIVE_GRADING_TOOLS, GET_GRADING_TOOL, LOGOUT, UPDATE_GRADING_TOOL, CREATE_GRADING_TOOL, CLEAR_GRADING_TOOL, SUCCESS_TOAST, ERROR_TOAST, DELETE_GRADING_TOOL} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';

const PATH = '/grading-tool'

export const getAllActiveGradingTools = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_GRADING_TOOLS,
          payload: axiosInstance.get(`${PATH}`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav soruları', 'GET')}`);
        });
    };
}

export const getAllGradingTools = (assessment_id='', course_id='') => {
    const query = course_id ? `?course=${course_id}` : assessment_id ? `?assessment=${assessment_id}` : ''
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_GRADING_TOOLS,
          payload: axiosInstance.get(`${PATH}${query}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav soruları', 'GET')}`);
        });
    };
}

export const getGradingTool = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_GRADING_TOOL,
          payload: axiosInstance.get(`${PATH}/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav sorusu', 'GET')}`);
        });
    };
}


export const createGradingTool = (courseId, grading_tool) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_GRADING_TOOL,
          payload: axiosInstance.post(`${PATH}`, grading_tool).then(async res => {
            toast.success(`${SUCCESS_TOAST('Sınav sorusu', true)}`);
            history.push(`/grading-tools/${courseId}/${grading_tool.assessment_id}`)
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllGradingTools(grading_tool.assessment_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav sorusu', 'POST')}`);
        });
    };
}
export const updateGradingTool = (courseId, id, grading_tool) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_GRADING_TOOL,
          payload: axiosInstance.put(`${PATH}/${id}`, grading_tool).then(async res => {
            history.push(`/grading-tools/${courseId}/${grading_tool.assessment_id}`)
            toast.success(`${SUCCESS_TOAST('Sınav sorusu', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllGradingTools(grading_tool.assessment_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Sınav sorusu', 'PUT')}`);
        });
    };
}

export const deleteGradingTool = (id, assessment_id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_GRADING_TOOL,
        payload: axiosInstance.delete(`${PATH}/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Sınav sorusu', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllGradingTools(assessment_id));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Sınav sorusu', 'DELETE')}`);
      });
  };
}

export const clearGradingTool = () => {
  return {
    type: CLEAR_GRADING_TOOL
  };
};
