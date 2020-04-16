import axios from 'axios';

export default axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: 'https://cadastro-de-doacoes-backend.herokuapp.com/',
});