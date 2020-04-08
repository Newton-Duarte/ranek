import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PaginaCarregando from '@/components/PaginaCarregando'

Vue.config.productionTip = false

Vue.component('PaginaCarregando', PaginaCarregando)

Vue.filter('formattedPrice', price => {
  price = Number(price);
  if (!isNaN(price)) {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  } else {
    return ''
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
