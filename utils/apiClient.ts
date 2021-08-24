import axios from 'axios';
import tokenService from 'service/tokenService';

let BASE_URL: string;
switch (process.env.NODE_ENV) {
  case 'production':
    BASE_URL = 'https://api.slicer.ca/rfg/api';
    break;
  case 'development':
    BASE_URL = 'http://localhost/rfg/api';
    break;
  default:
    BASE_URL = 'http://localhost/rfg/api';
    break;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

axios.interceptors.request.use(
  (config) => {
    let url = BASE_URL + config.url;

    // make sure url always ends with /
    let lastChar = url.substr(-1);
    if (lastChar !== '/') {
      url = url + '/';
    }
    config.url = url;

    // add the access token if we have it
    const token = tokenService.getToken();
    if (token) {
      config.headers.common['x-api-key'] = token;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response.data);
    // Make sure success is boolean
    if (response.data.success) {
      response.data.success = response.data.success === 'true';
    }
    return response && response.data;
  },
  (error) => {
    console.log(error.response.data);
    return error && error.response && error.response.data;
  }
);

export default axios;
