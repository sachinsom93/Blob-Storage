import axios from 'axios';

const URL = 'http://localhost:8000/api/v1/';

const axiosInstance = axios.create({
  baseURL: URL,
  responseType: 'json'
});

export default axiosInstance;
