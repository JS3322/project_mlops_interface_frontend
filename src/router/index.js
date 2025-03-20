import { createRouter, createWebHistory } from 'vue-router'
import ChatBot from '../components/ChatBot.vue'

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
      component: ChatBot
    },
    {
      path: '/c',
      name: 'c',
      component: ChatBot
    }
  ]
})

export default router 