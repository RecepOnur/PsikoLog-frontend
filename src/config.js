import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const setAuthToken = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
      delete axios.defaults.headers.common["Authorization"];
}

export default instance;