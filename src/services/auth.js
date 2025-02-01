import api from './api';

export const login = async (credentials) => {
    try {
      console.log(credentials);
      const response = await api.post('get_token', credentials);
      console.log(response.data);
      return response.data; // Например, { token: "JWT_TOKEN" }
    } catch (error) {
      console.error(error);
      throw error.response ? error.response.data : error;
    }
  };