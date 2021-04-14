import { GET_ALL_COURSES, GET_ALL_ACTIVE_COURSES, GET_COURSE, LOGOUT, UPDATE_COURSE, CREATE_COURSE, CLEAR_COURSE, SUCCESS_TOAST, ERROR_TOAST, DELETE_COURSE} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';


export const getAllActiveCourses = () => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_ACTIVE_COURSES,
          payload: axiosInstance.get(`/course`).then(async res => res.data.data)}))
        .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders', 'GET')}`);
        });
    };
}

export const getAllCourses = (department_id='') => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_ALL_COURSES,
          payload: axiosInstance.get(`/course${department_id && `?department=${department_id}`}`).then(async res => {
            return { content: [...res.data.data], page: res.data.count }
          })}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders', 'GET')}`);
        });
    };
}

export const getCourse = (id) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: GET_COURSE,
          payload: axiosInstance.get(`/course/${id}`).then(async res => res.data.data)}))
          .catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders', 'GET')}`);
        });
    };
}


export const createCourse = (course) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: CREATE_COURSE,
          payload: axiosInstance.post(`/course`, course).then(async res => {
            toast.success(`${SUCCESS_TOAST('Ders', true)}`);
            history.push(`/courses/${course.department_id}`)
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllCourses(course.department_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders', 'POST')}`);
        });
    };
}
export const updateCourse = (id, course) => {
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPDATE_COURSE,
          payload: axiosInstance.put(`/course/${id}`, course).then(async res => {
            history.push(`/courses/${course.department_id}`)
            toast.success(`${SUCCESS_TOAST('Ders', false)}`);
            return res.data
          })
        }
        )).then(arg => {
          dispatch(getAllCourses(course.department_id));
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Ders', 'PUT')}`);
        });
    };
}

export const deleteCourse = (id, department_id) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: DELETE_COURSE,
        payload: axiosInstance.delete(`/course/${id}`).then(async res => {
          toast.success(`${SUCCESS_TOAST('Ders', false)}`);
          return res.data
        })
      }
      )).then(arg => {
        dispatch(getAllCourses(department_id));
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Ders', 'DELETE')}`);
      });
  };
}

export const clearCourse = () => {
  return {
    type: CLEAR_COURSE
  };
};
