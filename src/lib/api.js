import axios from 'axios';

export const endpoints = {
  //Authentication
  login: {
    url: '/auth/login',
    method: 'POST',
  },
  register: {
    url: 'auth/register',
    method: 'POST',
  },
  verifyAccount: {
    url: 'auth/verify-account',
    method: 'GET',
  },
  requestPasswordReset: {
    url: 'auth/send-reset-password',
    method: 'POST',
  },
  resetPassword: {
    url: 'auth/reset-pass',
    method: 'POST',
  },
  //Incomes routes
  getIncomes: {
    url: '/incomes',
    method: 'GET',
  },
  createIncomes: {
    url: '/incomes',
    method: 'POST',
  },
  updateIncomes: {
    url: '/incomes',
    method: 'PATCH',
  },
  deleteIncomes: {
    url: '/incomes',
    method: 'DELETE',
  },
  //Outcomes routes
  getOutcomes: {
    url: '/outcomes',
    method: 'GET',
  },
  createOutcomes: {
    url: '/outcomes',
    method: 'POST',
  },
  updateOutcomes: {
    url: '/outcomes',
    method: 'PATCH',
  },
  deleteOutcomes: {
    url: '/outcomes',
    method: 'DELETE',
  },
  //Savings
  getSavings: {
    url: '/savings',
    method: 'GET',
  },
  createSavings: {
    url: '/savings',
    method: 'POST',
  },
  updateSavings: {
    url: '/savings',
    method: 'PATCH',
  },
  deleteSavings: {
    url: '/savings',
    method: 'DELETE',
  },
  //funds
  getFunds: {
    url: '/funds',
    method: 'GET',
  },
  createFunds: {
    url: '/funds',
    method: 'POST',
  },
  updateFunds: {
    url: '/funds',
    method: 'PATCH',
  },
  deleteFunds: {
    url: '/funds',
    method: 'DELETE',
  },
  //Users, dashboard
  getUsers: {
    url: '/users',
    method: 'GET',
  },
  createUser: {
    url: '/users',
    method: 'POST',
  },
  updateUser: {
    url: '/users',
    method: 'PATCH',
  },
  deleteUser: {
    url: '/users',
    method: 'DELETE',
  },
};

const api = {
  call: async (endpoint, data = {}, token = {}) => {
    try {
      const axiosConfig = token
        ? {
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: { Authorization: `Bearer ${token}` },
          }
        : { baseURL: process.env.REACT_APP_BASE_URL };
      const axiosInstance = axios.create(axiosConfig);
      const config = {
        ...endpoint,
        data: { ...data },
      };
      const result = await axiosInstance(config);
      return result.data;
    } catch (err) {
      return err.response.data;
    }
  },
};

export default api;
