<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuarioProdutos" name="list" tag="ul">
      <li v-for="produto in usuarioProdutos" :key="produto.id">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">Deletar</button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '../../api/api';
import ProdutoAdicionar from '@/components/ProdutoAdicionar.vue';
import ProdutoItem from '@/components/ProdutoItem.vue';

export default {
  name: 'UsuarioProdutos',
  components: {
    ProdutoAdicionar,
    ProdutoItem,
  },
  computed: {
    ...mapState(['login', 'usuario', 'usuarioProdutos'])
  },
  methods: {
    ...mapActions(['getUsuarioProdutos']),
    deletarProduto(id) {
      if (confirm('Tem certeza que deseja deletar o produto?')) {
        api.delete(`/produto/${id}`)
          .then(() => this.getUsuarioProdutos())
          .catch(err => console.error(`Ocorreu um erro ao deletar o produto: ${err}`));
      }
    }
  },
  watch: {
    login() {
      this.getUsuarioProdutos();
    }
  },
  created() {
    document.title = 'Ranek - Usuário | Produtos';
    if (this.login) {
      this.getUsuarioProdutos();
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all .3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url('~@/assets/remove.svg') no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>