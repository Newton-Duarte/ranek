import api from './api/api';
import { get } from 'axios';

export function getCep(cep) {
  return get(`http://viacep.com.br/ws/${cep}/json`);
}

export function login(body) {
  return api.post('https://ranekapi.newtonduarte.com.br/wp-json/jwt-auth/v1/token', body);
}