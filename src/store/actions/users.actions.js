import { GET_ALL_USERS, GET_USER, LOGOUT, UPDATE_USER, CREATE_USER, CLEAR_USER, SUCCESS_TOAST, ERROR_TOAST, DELETE_USER} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';

export const getAllUsers = (department_id='', user_type='') => {
    let url = "/user";
    let flag = false;
    if (!!user_type) {
      url += `?level=${user_type}`
      flag = true;
    } if(!!department_id) {
      url += `${flag ? '&' : '?' }department=${department_id}`
    }
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_USERS,
          payload: axiosInstance.get(url).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Kullanıcılar', 'GET')}`);
        });
    };
}

export const getUser = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_USER,
          payload: axiosInstance.get(`/user/${id}`).then(async res => res.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Kullanıcı', 'GET')}`);
        });
    };
}


export const createUser = (user) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_USER,
          payload: axiosInstance.post(`/user`, user).then(async res => {
            toast.success(`${SUCCESS_TOAST('Kullanıcı', true)}`);
            history.push(`/users/${user.department_id}`)
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllUsers(user.department_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Kullanıcı', 'POST')}`);
        });
    };
}
export const updateUser = (id, user) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_USER,
          payload: axiosInstance.put(`/user/${id}`, user).then(async res => {
            history.push(`/users/${user.department_id}`)
            toast.success(`${SUCCESS_TOAST('Kullanıcı', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllUsers(user.department_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Kullanıcı', 'PUT')}`);
        });
    };
}

export const deleteUser = (id, department_id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_USER,
        payload: axiosInstance.delete(`/user/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Kullanıcı', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllUsers(department_id));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Kullanıcı', 'DELETE')}`);
      });
  };
}

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};
