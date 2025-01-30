import axios  from "axios";

export const login = async (credentials) => {
    try {
      const response = await axios.post('https://base.ewnc.org/birds/api/v1/login', credentials);
      return response.data; // Например, { token: "JWT_TOKEN" }
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };