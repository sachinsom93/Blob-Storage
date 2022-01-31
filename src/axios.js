import axios from 'axios';

const URL = 'https://blob-storage-server.herokuapp.com/api/v1/';

const axiosInstance = axios.create({
  baseURL: URL,
  responseType: 'json'
});

export default axiosInstance;
