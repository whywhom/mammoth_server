import { createRouter, createWebHistory } from 'vue-router'
import BooksView from '../views/BooksListView.vue'
import BooksDetail from '../views/BookItemView.vue'
import LoginView from '../views/LoginView.vue'

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
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ]
})

export default router
