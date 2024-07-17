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
      redirect: '/dashboard/books', 
    },
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
          component: () => import('../components/DashBoard/BookDetail.vue')
        },
        {
          path: '/dashboard/order',
          name: 'order',
          component: () => import('../components/DashBoard/Order.vue')
        },
        {
          path: '/dashboard/wishlist',
          name: 'wishlist',
          component: () => import('../components/DashBoard/WishList.vue')
        },
        {
          path: '/dashboard/books',
          name: 'book',
          component: () => import('../components/DashBoard/Books.vue')
        },
        {
          path: '/dashboard/cartdetail',
          name: 'cart',
          component: () => import('../components/DashBoard/CartDetail.vue')
        },
      ]
    }
  ]
  
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = localStorage.getItem('API_KEY')
  if (!isAuthenticated && to.name !== 'login' && to.name !== 'signup' && to.name !== 'book' && to.name !== '') {
    console.log(to.path)
    return { name: 'login' }
  }
})


export default router
