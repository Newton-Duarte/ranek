import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Produto from '../views/Produto.vue'
import Login from '../views/Login.vue'
import Usuario from '../views/usuario/Usuario.vue'
import UsuarioProdutos from '../views/usuario/UsuarioProdutos.vue'
import UsuarioVendas from '../views/usuario/UsuarioVendas.vue'
import UsuarioCompras from '../views/usuario/UsuarioCompras.vue'
import UsuarioEditar from '../views/usuario/UsuarioEditar.vue'
import PaginaNaoEncontrada from '../views/PaginaNaoEncontrada.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    component: PaginaNaoEncontrada
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/usuario',
    component: Usuario,
    meta: {
      login: true
    },
    children: [
      {
        path: '',
        name: 'Usuario',
        component: UsuarioProdutos
      },
      {
        path: 'compras',
        name: 'UsuarioCompras',
        component: UsuarioCompras
      },
      {
        path: 'vendas',
        name: 'UsuarioVendas',
        component: UsuarioVendas
      },
      {
        path: 'editar',
        name: 'UsuarioEditar',
        component: UsuarioEditar
      }
    ]
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: Produto,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) next('/login')
    else next()
  } else {
    next()
  }
})

export default router
