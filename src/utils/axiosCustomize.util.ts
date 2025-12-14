import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const persistUser = localStorage.getItem('persist:user');
    if (persistUser) {
      const userData = JSON.parse(persistUser);
      const account = userData?.account ? JSON.parse(userData.account) : null;
      const token = account?.access_token || '';
      if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('[Axios Request Error]:', error); 
    return Promise.reject(error);
  }
);

// Process the response and handle errors
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 || data?.EC === -999) {
        localStorage.removeItem('token');
        localStorage.removeItem('persist:user');
        localStorage.removeItem('persist:root');
        localStorage.removeItem('persist:cart');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
