<template>
  <form ref="formProduto" class="adicionar-produto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome">
    <label for="preco">Preço</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco">
    <label for="fotos">Fotos</label>
    <input id="fotos" name="fotos" type="file" multiple ref="fotos">
    <label for="descricao">Descrição</label>
    <textarea id="descricao" name="descricao" type="text" v-model="produto.descricao"></textarea>
    <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto">
    <div class="erros">
      <ErroNotificacao :erros="erros" />
    </div>
  </form>
</template>

<script>
import api from '../api/api';

export default {
  name: 'ProdutoAdicionar',
  data: () => ({
    produto: {
      nome: '',
      preco: '',
      descricao: '',
      fotos: null,
      vendido: 'false'
    },
    erros: []
  }),
  methods: {
    validarProduto() {
      if (
        this.produto.nome &&
        this.produto.preco &&
        this.produto.descricao &&
        this.$refs.fotos.files.length
      ) {
        return true;
      } else {
        return false;
      }
    },
    formatarProduto() {
      const form = new FormData();
      const files = this.$refs.fotos.files;

      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append('nome', this.produto.nome);
      form.append('preco', this.produto.preco);
      form.append('descricao', this.produto.descricao);
      form.append('vendido', this.produto.vendido);
      form.append('usuario_id', this.$store.state.usuario.id);

      return form;
    },
    async adicionarProduto(event) {
      this.erros = [];
      if (this.validarProduto()) {
        const produto = this.formatarProduto();
        const button = event.currentTarget;
        button.value = 'Adicionando...';
        button.setAttribute('disabled', '');
        try {
          await api.post('/produto', produto);
          await this.$store.dispatch('getUsuarioProdutos');
          button.value = 'Adicionar Produto'; 
          button.removeAttribute('disabled');
          this.$refs.formProduto.reset();
          this.$nextTick(() => document.getElementById('nome').focus());
        } catch (error) {
          this.erros.push(error.response.data.message);
          button.value = 'Adicionar Produto';
          button.removeAttribute('disabled');
        }
      } else {
        this.erros.push('Por favor preencha todos os campos.');
        this.$nextTick(() => document.getElementById('nome').focus());
      }
    }
  }
}
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}

.erros {
  grid-column: 2;
}
</style>