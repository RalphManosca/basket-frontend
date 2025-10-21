import axios from 'axios';

const catalogAPI = axios.create({
  baseURL: import.meta.env.VITE_CATALOG_API_URL || 'http://localhost:8001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const checkoutAPI = axios.create({
  baseURL: import.meta.env.VITE_CHECKOUT_API_URL || 'http://localhost:8002/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for error handling
[catalogAPI, checkoutAPI].forEach(api => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // Server responded with error
        console.error('API Error:', error.response.data);
      } else if (error.request) {
        // Request made but no response
        console.error('Network Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
});

export { catalogAPI, checkoutAPI };
