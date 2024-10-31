import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

const getToken = () => Cookies.get('token')

// components
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/users',
      name: 'users.index',
      component : () => import('../views/admin/users/index.vue'),
      meta:{
        requireAuth: true
      }
    },
    {
      path: '/users/create',
      name: 'users.create',
      component : () => import('../views/admin/users/CreateView.vue'),
      meta:{
        requireAuth: true
      }
    },
    {
      path: '/users/edit/:id',
      name: 'users.edit',
      component : () => import('../views/admin/users/EditView.vue'),
      meta:{
        requireAuth: true
      }
    }
  ],
})

router.beforeEach((to, from, next) =>   {
  //get the token from the user
  const token = getToken()

 // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
  if(to.matched.some(record => record.meta.requiresAuth) && !token) {
    //di arahkan ke login
    next({name: 'login'})
  }
  // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
  else if(to.matched.some(record => record.meta.requiresGuest) && token) {
    next({ name: 'dashboard'})
  }else{
    next()
  }
})

export default router
