import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    usuario: {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = payload;
    }
  },
  actions: {
    getUsuario(context, payload) {
      api.get(`/usuario/${payload}`)
        .then(res => {
          context.commit('UPDATE_USUARIO', res.data);
          context.commit('UPDATE_LOGIN', true);
        })
        .catch(err => console.error(`Ocorreu um erro ao buscar o usuário: ${err}`));
    }
  },
  modules: {
  }
})
