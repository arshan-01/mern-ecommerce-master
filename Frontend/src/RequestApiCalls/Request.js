import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://jolly-frog-7.loca.lt";


export const publicRequest = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: {
    'Content-type': 'application/json',
  },

  withCredentials: true,
});


export const userRequest = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: {
    'Content-type': 'application/json',
  },

  withCredentials: true,
});
