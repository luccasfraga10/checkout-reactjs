import axios from 'axios';

const getZipCode = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export default getZipCode;
