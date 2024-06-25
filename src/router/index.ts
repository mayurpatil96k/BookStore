import { createRouter, createWebHistory } from 'vue-router'
import LoginAndSignup from '../views/LoginAndSignup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginAndSignup
    },
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
