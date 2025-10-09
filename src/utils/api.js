import axios from 'axios';
import { API_BASE_URL, AUTH_BASE_URL, STORAGE_KEYS } from './constants';

// Create axios instances
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const bookingAPI = {
  create: (data) => apiClient.post('/bookings', data),
  getAll: () => apiClient.get('/bookings'),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  update: (id, data) => apiClient.put(`/bookings/${id}`, data),
  delete: (id) => apiClient.delete(`/bookings/${id}`)
};

export const authAPI = {
  login: (data) => authClient.post('/login', data),
  register: (data) => authClient.post('/register', data),
  profile: () => authClient.get('/profile')
};

export const trackingAPI = {
  getOrder: (orderId) => apiClient.get(`/tracking/${orderId}`)
};