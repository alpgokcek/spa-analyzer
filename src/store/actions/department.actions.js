import { GET_ALL_DEPARTMENTS, GET_ALL_ACTIVE_DEPARTMENTS, GET_DEPARTMENT, LOGOUT, UPDATE_DEPARTMENT, CREATE_DEPARTMENT, CLEAR_DEPARTMENT, SUCCESS_TOAST, ERROR_TOAST} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllActiveDepartments = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_DEPARTMENTS,
          payload: axiosInstance.get(`/department`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Departman', 'GET')}`);
        });
    };
}

export const getAllDepartments = (facultyId='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_DEPARTMENTS,
          payload: axiosInstance.get(`/department${facultyId && `?faculty=${facultyId}`}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Departman', 'GET')}`);
        });
    };
}

export const getDepartment = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_DEPARTMENT,
          payload: axiosInstance.get(`/department/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Departman', 'GET')}`);
        });
    };
}


export const createDepartment = (department) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_DEPARTMENT,
          payload: axiosInstance.post(`/department`, department).then(async res => {
            toast.success(`${SUCCESS_TOAST('Departman', true)}`);
            history.push(`/departments/${department.faculty}`)
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllDepartments(department.faculty));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Departman', 'POST')}`);
        });
    };
}
export const updateDepartment = (id, department) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_DEPARTMENT,
          payload: axiosInstance.put(`/department/${id}`, department).then(async res => {
            history.push(`/departments/${department.faculty}`)
            toast.success(`${SUCCESS_TOAST('Departman', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllDepartments(department.faculty));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Departman', 'PUT')}`);
        });
    };
}

export const deleteDepartment = (id, facultyId) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: UPDATE_DEPARTMENT,
        payload: axiosInstance.delete(`/department/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Departman', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllDepartments(facultyId));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Departman', 'DELETE')}`);
      });
  };
}

export const clearDepartment = () => {
  return {
    type: CLEAR_DEPARTMENT
  };
};
