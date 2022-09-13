import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Pokemon.vue'
import Detail from '../components/pokemon/PokemonDetail.vue'
import List from '../components/pokemon/PokemonList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/lists',
      name: 'lists',
      component: List
    }
  ]
})

export default router
