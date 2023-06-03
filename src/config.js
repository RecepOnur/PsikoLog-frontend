import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:3000'
});

export const setAuthToken = token => {
  if (token) {
      myAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
      delete myAxios.defaults.headers.common["Authorization"];
}

export default myAxios;