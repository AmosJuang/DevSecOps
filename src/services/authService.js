import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const register = async (userData) => {
  try {
    console.log('Sending registration request:', userData);
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Registration failed' };
  }
};