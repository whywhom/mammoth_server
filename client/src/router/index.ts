import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';
import BooksView from '../views/BooksListView.vue'
import BooksDetail from '../views/BookItemView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import AdminBooksView from '../views/AdminBooksView.vue'
import AdminArticlesView from '../views/AdminView.vue'
import AdminUsersView from '../views/AdminView.vue'

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
      name: 'login',
      path: '/login',
      component: LoginView,
    },
    {
      name: 'admin',
      path: '/admin',
      component: AdminView,
    },
    {
      name: 'admin_book',
      path: '/admin/books',
      component: AdminBooksView,
    },
    {
      name: 'admin_articles',
      path: '/admin/articles',
      component: AdminArticlesView,
    },
    {
      name: 'admin_users',
      path: '/admin/users',
      component: AdminUsersView,
    },
  ]
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const user = store?.getters?.getUser;

  if (to.path === '/admin') {
    if (user?.isLoggedin && user?.isAdmin) {
      next();
    } else {
      // If the user is not logged in, redirect to the login page and save the /admin route as the intended route
      next({ path: '/login', query: { redirect: '/admin' } });
    }
  } else {
    // For other routes, allow access
    next();
  }
});

export default router
