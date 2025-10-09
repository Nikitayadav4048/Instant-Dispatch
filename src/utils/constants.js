// API Base URLs
export const API_BASE_URL = 'http://localhost:5003/api';
export const AUTH_BASE_URL = 'http://localhost:5004/api/auth';

// Order Status
export const ORDER_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

// Vehicle Types
export const VEHICLE_TYPES = {
  BIKE: 'bike',
  SCOOTER: 'scooter',
  MINI_TRUCK: 'miniTruck'
};

// Payment Status
export const PAYMENT_STATUS = {
  COD: 'cod',
  ONLINE: 'online',
  UPI: 'upi',
  PAID: 'paid'
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  RIDER: 'rider',
  ADMIN: 'admin'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  THEME: 'theme'
};