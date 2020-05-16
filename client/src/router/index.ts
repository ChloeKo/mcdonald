import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Seller from '../components/Seller/Seller.vue'
import Order from '../components/Order/Order.vue'
import Rating from '../components/Rating/Rating.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
    {
      path: '/',
      redirect: '/order'
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/order',
      name:'Order',
      component: Order
    },
    {
      path: '/rating',
      name:'Rating',
      component: Rating
    }
]

const router = new VueRouter({
  routes
})

export default router
