import { API_URL } from 'AppConstants';
import axios from 'axios';
import _ from "lodash";

export const feAssetFormats = {
  js: 'js',
  css: 'css'
};

export const getFeAssets = (manifest, assetsPath, format, nonce) => {
  const list = Object.values(manifest)
    .filter(item => item.includes(`.${format}`))
    .map(item => {
      return format === feAssetFormats.js ? `<script src="${assetsPath}${item}" async></script>` : `<link href="${assetsPath}${item}" rel="stylesheet">\n`;
    });
  list.reverse();
  return list;
};

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  config.baseURL = API_URL
  if(localStorage.getItem('access_token')){
    config.headers.Authorization =  `Bearer ${localStorage.getItem('access_token')}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(res => res, err => Promise.reject(err));


const isArrayUpdated = (array1, array2) => array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
export const isUpdated = (obj1, obj2)=> Object.keys(_.omit(obj1, 'errors')).map(field => obj1[field] instanceof Array ? !isArrayUpdated(obj1[field], obj2[field]): obj1[field] !== obj2[field]).some(bool => !!bool)