<template>
  <section>
    <h2>Endereço de Envio</h2>
    <ErroNotificacao :erros="erros" />
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import api from '../api/api';
import { mapState } from 'vuex';

export default {
  name: 'FinalizarCompra',
  props: ['produto'],
  components: {
    UsuarioForm
  },
  data: () => ({
    erros: []
  }),
  computed: {
    ...mapState(['usuario']),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado
        }
      }
    }
  },
  methods: {
    async addUsuario() {
      try {
        await this.$store.dispatch('addUsuario', this.$store.state.usuario);
        await this.$store.dispatch('logarUsuario', this.$store.state.usuario);
        await this.$store.dispatch('getUsuario');
        await this.criarTransacao();
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
    criarTransacao() {
      return api.post(`/transacao`, this.compra)
        .then(() => this.$router.push({ name: 'UsuarioCompras' }))
        .catch(err => console.error(`Ocorreu um erro ao criar a transação: ${err}`));
    },
    finalizarCompra() {
      this.erros = [];
      if (this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.addUsuario();
      }
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
  width: 100%;
}
</style>