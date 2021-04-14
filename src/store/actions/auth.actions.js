import axios from 'axios';
import { LOGIN_ERROR, PASSWORD_FORGOT, PASSWORD_RESET, PASSWORD_SET, LOGIN, LOGOUT, SUCCESS_TOAST, ERROR_TOAST, FORGOT_PASSWORD_SUCCESS} from 'AppConstants';
import jwt from 'jwt-decode'
import {axiosInstance} from 'Utils'
import { toast } from 'react-toastify';
import { history } from 'History'


export const login = (email, password) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: LOGIN,
        payload: axiosInstance.post(`/auth/login`, {email, password})
        .then(async res =>{
          const {access_token, level, name, user} = res.data

          return {
            access_token: access_token,
            name: name,
            role: level,
            ...user
          }
        }
        )})).catch(error=>error)
  };
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
  };
};

export const forgotPassword = (email) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: PASSWORD_FORGOT,
        payload: axiosInstance.post(`/auth/forgot-password`, {email})
        .then(async res =>{
          history.push('/giris-yap')
          toast(`${FORGOT_PASSWORD_SUCCESS}`);
          return res
        }
        )}))
        .catch(e => {
          toast.error(`${ERROR_TOAST('', 'OTHER')}`);
      });
  };
}

export const resetPassword = (token, password) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: PASSWORD_RESET,
        payload: axiosInstance.post(`/auth/reset-password`, {token, password})
        .then(async res =>{
          history.push('/giris-yap')
          toast(`${SUCCESS_TOAST('Şifreniz', false)}`);
          return res
        }
        )}))
        .catch(e => {
          toast.error(`${ERROR_TOAST('Şifreniz', 'PUT')}`);
      });
  };
}

export const setPassword = (password, handleSetPasswordModalState) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: PASSWORD_SET,
        payload: axiosInstance.post(`/auth/set-password`, {password})
        .then(async res =>{
          toast.success(`${SUCCESS_TOAST('Şifreniz', false)}`);
          handleSetPasswordModalState()
          return res
        }
        )}))
        .catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Şifreniz', 'PUT')}`);
      });
  };
}