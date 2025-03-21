import { createRouter, createWebHistory } from 'vue-router'
import ChatBot from '../components/ChatBot.vue'
import PageB from '../components/PageB.vue'
import PageC from '../components/PageC.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChatBot
    },
    {
      path: '/a',
      name: 'a',
      component: ChatBot
    },
    {
      path: '/b',
      name: 'b',
      component: PageB
    },
    {
      path: '/c',
      name: 'c',
      component: PageC
    }
  ]
})

export default router 