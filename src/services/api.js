import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://cadastro-de-doacoes-backend.herokuapp.com/',
});