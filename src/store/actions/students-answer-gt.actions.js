import {
    GET_ALL_SAGT,
    LOGOUT,
    SUCCESS_TOAST,
    ERROR_TOAST,
    CREATE_SAGT,
    UPDATE_SAGT,
    GET_SAGT,
    DELETE_SAGT,
    CLEAR_SAGT,
  } from "AppConstants";
  import { toast } from "react-toastify";
  import { history } from "History";
  import { axiosInstance } from "Utils";
  
  const SAGT_PATH = "/sagt";
  
  export const getAllStudentsAnswerGT = (query = "", course_id="") => {
    const newQuery = query ? query : course_id ? `?course=${course_id}` : ''
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: GET_ALL_SAGT,
          payload: axiosInstance
            .get(`${SAGT_PATH}${newQuery}`)
            .then(async (res) => res.data.data),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("Students answer GT", "GET")}`);
      });
    };
  };
  
  export const getStudentsAnswerGT = (id) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: GET_SAGT,
          payload: axiosInstance
            .get(`${SAGT_PATH}/${id}`)
            .then(async (res) => res.data.data),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("Students answer GT", "GET")}`);
      });
    };
  };
  
  export const createStudentsAnswerGT = (sagt) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: CREATE_SAGT,
          payload: axiosInstance
            .post(`${SAGT_PATH}`, sagt)
            .then(async (res) => {
              toast.success(`${SUCCESS_TOAST("Students answer GT", true)}`);
              history.goBack();
              return res.data;
            }),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("Students answer GT", "POST")}`);
      });
    };
  };
  
  export const updateStudentsAnswerGT = (id, sagt) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: UPDATE_SAGT,
          payload: axiosInstance.put(`${SAGT_PATH}/${id}`, sagt).then(async (res) => {
            toast.success(`${SUCCESS_TOAST("Students answer GT", false)}`);
            history.goBack();
            return res.data;
          }),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("Students answer GT", "PUT")}`);
      });
    };
  };
  
  export const deleteStudentsAnswerGT = (id) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: DELETE_SAGT,
          payload: axiosInstance
            .delete(`${SAGT_PATH}/${id}`)
            .then(async (res) => {
              toast.success(`${SUCCESS_TOAST("Students answer GT", false)}`);
              history.goBack();
              return res.data;
            }),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("Students answer GT", "DELETE")}`);
      });
    };
  };
  export const clearStudentsAnswerGT = () => {
    return { type: CLEAR_SAGT };
  };
  