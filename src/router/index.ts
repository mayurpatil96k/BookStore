import { createRouter, createWebHistory } from 'vue-router'
import LoginAndSignup from '../views/LoginAndSignup.vue'
import Login from '../components/LoginSignup/Login.vue'
import Signup from '../components/LoginSignup/Signup.vue'
import DashBoard from '../views/DashBoard.vue'
import BookDetail from '@/components/DashBoard/BookDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginAndSignup,
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/signup',
          name: 'signup',
          component: Signup
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      children: [
        {
          path: '/dashboard/bookdetail/:id',
          name: 'bookdetail',
          component: BookDetail
        },
        {
          path: '/dashboard/books',
          name: 'book',
          component: () => import('../components/DashBoard/Books.vue')
        },
      ]
    }
    // {
    //   path: '/',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/LoginAndSignup.vue')
    // }
  ]
})

export default router
