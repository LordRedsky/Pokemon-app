import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Pokemon.vue'
import Collections from '../components/pokemon/PokemonCatched.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collections',
      name: 'collections',
      component: Collections
    }
  ]
})

export default router
