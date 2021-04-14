import {
  GET_ALL_POPCO,
  LOGOUT,
  SUCCESS_TOAST,
  ERROR_TOAST,
  CREATE_POPCO,
  UPDATE_POPCO,
  GET_POPCO,
  DELETE_POPCO,
  CLEAR_POPCO,
} from "AppConstants";
import { toast } from "react-toastify";
import { history } from "History";
import { axiosInstance } from "Utils";

const POPCO_PATH = "/popco";

export const getAllPOProvideCO = (query = "", course_id="") => {
  const newQuery = query ? query : course_id ? `?course=${course_id}` : ''
  return (dispatch) => {
    return Promise.resolve(
      dispatch({
        type: GET_ALL_POPCO,
        payload: axiosInstance
          .get(`${POPCO_PATH}${newQuery}`)
          .then(async (res) => res.data.data),
      })
    ).catch((e) => {
      if (e.response.status === 401) dispatch({ type: LOGOUT });
      else toast.error(`${ERROR_TOAST("PO provide CO", "GET")}`);
    });
  };
};

export const getPOProvideCO = (id) => {
  return (dispatch) => {
    return Promise.resolve(
      dispatch({
        type: GET_POPCO,
        payload: axiosInstance
          .get(`${POPCO_PATH}/${id}`)
          .then(async (res) => res.data.data),
      })
    ).catch((e) => {
      if (e.response.status === 401) dispatch({ type: LOGOUT });
      else toast.error(`${ERROR_TOAST("PO provide CO", "GET")}`);
    });
  };
};

export const createPOProvideCO = (popco) => {
  return (dispatch) => {
    return Promise.resolve(
      dispatch({
        type: CREATE_POPCO,
        payload: axiosInstance
          .post(`${POPCO_PATH}`, popco)
          .then(async (res) => {
            toast.success(`${SUCCESS_TOAST("PO provide CO", true)}`);
            history.goBack();
            return res.data;
          }),
      })
    ).catch((e) => {
      if (e.response.status === 401) dispatch({ type: LOGOUT });
      else toast.error(`${ERROR_TOAST("PO provide CO", "POST")}`);
    });
  };
};

export const updatePOProvideCO = (id, popco) => {
  return (dispatch) => {
    return Promise.resolve(
      dispatch({
        type: UPDATE_POPCO,
        payload: axiosInstance.put(`${POPCO_PATH}/${id}`, popco).then(async (res) => {
          toast.success(`${SUCCESS_TOAST("PO provide CO", false)}`);
          history.goBack();
          return res.data;
        }),
      })
    ).catch((e) => {
      if (e.response.status === 401) dispatch({ type: LOGOUT });
      else toast.error(`${ERROR_TOAST("POPCO", "PUT")}`);
    });
  };
};

export const deletePOProvideCO = (id) => {
  return (dispatch) => {
    return Promise.resolve(
      dispatch({
        type: DELETE_POPCO,
        payload: axiosInstance
          .delete(`${POPCO_PATH}/${id}`)
          .then(async (res) => {
            toast.success(`${SUCCESS_TOAST("PO provide CO", false)}`);
            history.goBack();
            return res.data;
          }),
      })
    ).catch((e) => {
      if (e.response.status === 401) dispatch({ type: LOGOUT });
      else toast.error(`${ERROR_TOAST("POPCO", "DELETE")}`);
    });
  };
};
export const clearPOProvideCO = () => {
  return { type: CLEAR_POPCO };
};
