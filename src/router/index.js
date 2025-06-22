import Vue from 'vue'
import VueRouter from 'vue-router'
import CesiumViewer from '../views/CesiumViewer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CesiumViewer
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
