<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
    <ErroNotificacao :erros="erros" />
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import api from '../../api/api';

export default {
  name: 'UsuarioEditar',
  components: {
    UsuarioForm
  },
  data: () => ({
    erros: []
  }),
  methods: {
    atualizarUsuario() {
      this.erros = [];
      api.put('/usuario', this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch('getUsuario');
          this.$router.push({ name: 'Usuario' });
        })
        .catch(err => this.erros.push(err.response.data.message));
    }
  },
  created() {
    document.title = 'Ranek - Usuário | Editar';
  }
}
</script>

<style>

</style>