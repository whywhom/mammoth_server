import { createRouter, createWebHistory } from 'vue-router'
import BooksView from '../views/BooksListView.vue'
import BooksDetail from '../views/BookItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BooksView
    },
    {
      name: 'Books',
      path: '/book/:id', 
      component: BooksDetail, 
      props: true 

    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
