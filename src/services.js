import { get } from 'axios';

export function getCep(cep) {
  return get(`http://viacep.com.br/ws/${cep}/json`);
}