import axios from 'axios';
import store from "../store"

  const instance = axios.create();
  instance.interceptors.request.use((config) => {
    store.dispatch('process')
    return config;
  });

  instance.interceptors.response.use((response) => {
    store.dispatch('received')  
    return response;
  }, error => {
    store.dispatch('error', error)
  });

export const apiService = {
  get(resource, params) {
    return axios.get(resource, params).catch((error) => {
      throw new Error(`[EP] ApiService ${error}`);
    });
  },
  async post(resource, data, params) {
    return instance.post(resource, data, params).then((res) => {
      
      return res;
    }).catch((error) => {
      throw new Error(`[FS] Apiservice ${error}`);
    });
  },
};

export const uploadService = {
  post(file) {
    const params = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    };
    const resource = 'https://facensor.herokuapp.com/fapi/upload/';
    return apiService.post(resource, file, params);
  },
  get() {
    const resource = 'https://facensor.herokuapp.com/'
    return apiService.get(resource)
  }
};

export default apiService;
