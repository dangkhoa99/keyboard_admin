export const BASE_URL = 'http://localhost:5000/api'

export const RestEndpoints = {
  AUTH: 'auth',
  LOGIN: 'auth/signIn',
  USER: 'users',
  PRODUCT: 'products',
  CATEGORY: 'categories',
  ORDER: 'orders',
}

export const Statuses = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  APPROVED: 'APPROVED',
  COMPLETED: 'COMPLETED',
}

export const Roles = {
  SUPER_ADMIN: '99-super-admin',
  ADMIN: '98-admin',
  USER: '01-user',
}
