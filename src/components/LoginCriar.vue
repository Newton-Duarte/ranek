<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" @click="criar = true" class="btn">Criar Conta</button> 
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="addUsuario">Criar Conta</button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';

export default {
  name: 'LoginCriar',
  data: () => ({
    criar: false
  }),
  components: {
    UsuarioForm
  },
  methods: {
    async addUsuario() {
      try {
        await this.$store.dispatch('addUsuario', this.$store.state.usuario);
        await this.$store.dispatch('getUsuario', this.$store.state.usuario.email);
        this.$router.push({ name: 'Usuario'});
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>