import axios from 'axios'

const APP_KEY  = '5af0d578fad72fc680a6cdbd8e6c738fd431aa40330b04c3e53b7ab0a94ef2b5';
const BASE_API = 'http://mock.biaoyansu.com/api/1/';

function sign (app_key, timestamp) {
  return btoa(app_key + timestamp);
}

export default function api (url, params) {
  let timestamp = (new Date).getTime();
  let signature = sign(APP_KEY, timestamp);

  let opt = {
    headers : {
      'BIAO-MOCK-APP-KEY'   : APP_KEY,
      'BIAO-MOCK-TIMESTAMP' : timestamp,
      'BIAO-MOCK-SIGNATURE' : signature,
    },
  };

  url = BASE_API + url;
  return axios
    .post(url, params, opt)
    .then(r => {
      return r.data;
    });
}