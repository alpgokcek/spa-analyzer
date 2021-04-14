import {
    GET_ALL_GTCCO,
    LOGOUT,
    SUCCESS_TOAST,
    ERROR_TOAST,
    CREATE_GTCCO,
    UPDATE_GTCCO,
    GET_GTCCO,
    DELETE_GTCCO,
    CLEAR_GTCCO,
  } from "AppConstants";
  import { toast } from "react-toastify";
  import { history } from "History";
  import { axiosInstance } from "Utils";
  
  const GTCCO_PATH = "/gtcco";
  
  export const getAllGTCoverCO = (query = "", course_id="") => {
    const newQuery = query ? query : course_id ? `?course=${course_id}` : ''
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: GET_ALL_GTCCO,
          payload: axiosInstance
            .get(`${GTCCO_PATH}${newQuery}`)
            .then(async (res) => res.data.data),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("GT cover CO", "GET")}`);
      });
    };
  };
  
  export const getGTCoverCO = (id) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: GET_GTCCO,
          payload: axiosInstance
            .get(`${GTCCO_PATH}/${id}`)
            .then(async (res) => res.data.data),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("GT cover CO", "GET")}`);
      });
    };
  };
  
  export const createGTCoverCO = (GTCCO) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: CREATE_GTCCO,
          payload: axiosInstance
            .post(`${GTCCO_PATH}`, GTCCO)
            .then(async (res) => {
              toast.success(`${SUCCESS_TOAST("GT cover CO", true)}`);
              history.goBack();
              return res.data;
            }),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("GT cover CO", "POST")}`);
      });
    };
  };
  
  export const updateGTCoverCO = (id, GTCCO) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: UPDATE_GTCCO,
          payload: axiosInstance.put(`${GTCCO_PATH}/${id}`, GTCCO).then(async (res) => {
            toast.success(`${SUCCESS_TOAST("GT cover CO", false)}`);
            history.goBack();
            return res.data;
          }),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("GT cover CO", "PUT")}`);
      });
    };
  };
  
  export const deleteGTCoverCO = (id) => {
    return (dispatch) => {
      return Promise.resolve(
        dispatch({
          type: DELETE_GTCCO,
          payload: axiosInstance
            .delete(`${GTCCO_PATH}/${id}`)
            .then(async (res) => {
              toast.success(`${SUCCESS_TOAST("GT cover CO", false)}`);
              history.goBack();
              return res.data;
            }),
        })
      ).catch((e) => {
        if (e.response.status === 401) dispatch({ type: LOGOUT });
        else toast.error(`${ERROR_TOAST("GT cover CO", "DELETE")}`);
      });
    };
  };
  export const clearGTCoverCO = () => {
    return { type: CLEAR_GTCCO };
  };
  