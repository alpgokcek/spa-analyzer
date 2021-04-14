import { GET_ALL_PROGRAM_OUTCOMES, GET_ALL_ACTIVE_PROGRAM_OUTCOMES, GET_PROGRAM_OUTCOME, LOGOUT, UPDATE_PROGRAM_OUTCOME, CREATE_PROGRAM_OUTCOME, CLEAR_PROGRAM_OUTCOME, SUCCESS_TOAST, ERROR_TOAST, DELETE_PROGRAM_OUTCOME} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllActiveProgramOutcomes = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_PROGRAM_OUTCOMES,
          payload: axiosInstance.get(`/program-outcome`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}

export const getAllProgramOutcomes = (department_id='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_PROGRAM_OUTCOMES,
          payload: axiosInstance.get(`/program-outcome${department_id && `?department=${department_id}`}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}

export const getProgramOutcome = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_PROGRAM_OUTCOME,
          payload: axiosInstance.get(`/program-outcome/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'GET')}`);
        });
    };
}


export const createProgramOutcome = (program_outcome) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_PROGRAM_OUTCOME,
          payload: axiosInstance.post(`/program-outcome`, program_outcome).then(async res => {
            toast.success(`${SUCCESS_TOAST('Öğrenci çıktısı', true)}`);
            history.push(`/program-outcomes/${program_outcome.department_id}`)
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllProgramOutcomes(program_outcome.department_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'POST')}`);
        });
    };
}
export const updateProgramOutcome = (id, program_outcome) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_PROGRAM_OUTCOME,
          payload: axiosInstance.put(`/program-outcome/${id}`, program_outcome).then(async res => {
            history.push(`/program-outcomes/${program_outcome.department_id}`)
            toast.success(`${SUCCESS_TOAST('Öğrenci çıktısı', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllProgramOutcomes(program_outcome.department_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'PUT')}`);
        });
    };
}

export const deleteProgramOutcome = (id, department_id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_PROGRAM_OUTCOME,
        payload: axiosInstance.delete(`/program-outcome/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Öğrenci çıktısı', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllProgramOutcomes(department_id));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Öğrenci çıktısı', 'DELETE')}`);
      });
  };
}

export const clearProgramOutcome = () => {
  return {
    type: CLEAR_PROGRAM_OUTCOME
  };
};
