import { LOGOUT, ERROR_TOAST, CLEAR_FILE, UPLOAD_FILE, FILE_UPLOAD, SUCCESS_TOAST_METHOD} from 'AppConstants';
import { toast } from 'react-toastify';
import { history } from 'History'
import { axiosInstance } from 'Utils';
import axios from 'axios';

const flaskAxiosInstance = axios.create();
flaskAxiosInstance.interceptors.request.use((config) => {
  if(localStorage.getItem('access_token')){
    config.headers.Authorization =  `Bearer ${localStorage.getItem('access_token')}`;
  }
  return config;
});
flaskAxiosInstance.interceptors.response.use(res => res, err => Promise.reject(err));

export const uploadFile = (file, path) => {
    let formData = new FormData();
    formData.append("fileUrl", file.fileUrl);
    return dispatch => {
        return Promise.resolve(dispatch({
          type: UPLOAD_FILE,
          payload: axiosInstance.post(`${path}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }).then(async res => {
            toast.success(`${SUCCESS_TOAST_METHOD('Dosya', 'IMPORT')}`);
            return res.data
          })
        }
        )).then(arg => {
          history.pop();
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Dosya', 'IMPORT')}`);
        });
    };
}

export const uploadSPAFile = (file) => {
    let formData = new FormData();
    formData.append("section", file.section);
    formData.append("department", file.department);
    formData.append("year_and_term", file.year_and_term);
    formData.append("type", file.type);
    formData.append("code", file.code);
    formData.append("name", file.name);
    formData.append("credit", file.credit);
    formData.append("file", file.file);

    return dispatch => {
      
        return Promise.resolve(dispatch({
          type: UPLOAD_FILE,
          payload: flaskAxiosInstance.post(`${FILE_UPLOAD.SPA_FILE}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }).then(async res => {
            toast.success(`${SUCCESS_TOAST_METHOD('Dosya', 'IMPORT')}`);
            return res.data
          })
        }
        )).then(arg => {
          history.pop();
        }).catch(e => {
            if(e.response.status === 401) dispatch({ type: LOGOUT })
            else toast.error(`${ERROR_TOAST('Dosya', 'IMPORT')}`);
        });
    };
}

export const deleteSPAFile = (file, path) => {
  return dispatch => {
      return Promise.resolve(dispatch({
        type: UPLOAD_FILE,
        payload: flaskAxiosInstance.delete(`${FILE_UPLOAD.SPA_FILE_DELETE}`, file).then(async res => {
          toast.success(`${SUCCESS_TOAST_METHOD('Dosya', 'DELETE')}`);
          return res.data
        })
      }
      )).then(arg => {
        history.pop();
      }).catch(e => {
          if(e.response.status === 401) dispatch({ type: LOGOUT })
          else toast.error(`${ERROR_TOAST('Dosya', 'DELETE')}`);
      });
  };
}

export const clearFile = () => {
    return {
      type: CLEAR_FILE
    };
  };
  