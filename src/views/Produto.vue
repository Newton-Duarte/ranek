<template>
  <section>
    <div v-if="produto" class="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo">
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ produto.preco | formattedPrice }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" v-if="!finalizar" @click="finalizar = true">Comprar</button>
          <FinalizarCompra v-else :produto=produto />
        </transition>
        <button class="btn btn-disabled" v-else disabled>Produto Vendido</button>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import api from '../api/api';
import FinalizarCompra from '@/components/FinalizarCompra.vue';

export default {
  name: 'Produto',
  components: {
    FinalizarCompra
  },
  data: () => ({
    produto: null,
    finalizar: false
  }),
  props: ['id'],
  methods: {
    getProduto() {
      api.get(`/produto/${this.id}`)
        .then(res => { 
          this.produto = res.data;
          document.title = `Ranek - ${this.produto.nome}`;
        })
        .catch(err => console.error(`Ocorreu um erro ao buscar o produto: ${err}`));
    }
  },
  created() {
    this.getProduto();
  }
}
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.fotos {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 20px;
}

.descricao {
  font-size: 1.2rem;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, .2);
  border-radius: 4px;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
  }
  .fotos {
    grid-row: 2;
  }
  .info {
    position: initial;
  }
}
</style>